import computeStyles from '../src/computeStyles';
import runTests from './runTests';

runTests({
  func: computeStyles,
  tests: [
    {
      capability: 'return an empty array when supplied null/undefined',
      input: {},
      expected: [],
    },

    {
      capability: 'include any strings (classNames) from the input styles array',
      input: {
        styles: [
          'aaa',
        ],
      },
      expected: [
        'aaa',
      ],
    },

    {
      capability: 'not include any objects when no props are supplied (we assume false)',
      input: {
        styles: [
          {
            '[test]': {color: 'red'},
          },
        ],
      },
      expected: [
      ],
    },

    {
      capability: 'include multiple style objects',
      input: {
        styles: [
          {
            '[test]': {color: 'black'},
          },
          {
            '[test]': {color: 'red'},
          },
        ],

        props: {
          test: true,
        },
      },
      expected: [
        {color: 'black'},
        {color: 'red'},
      ],
    },

    {
      capability: 'include multiple style objects mixed with strings (classNames)',
      input: {
        styles: [
          {
            '[test]': 'MyComponent_test',
          },
          {
            '[test]': {color: 'black'},
          },
          {
            '[test]': {color: 'red'},
          },
        ],

        props: {
          test: true,
        },
      },
      expected: [
        'MyComponent_test',
        {color: 'black'},
        {color: 'red'},
      ],
    },

    {
      capability: 'maintain order of key iteration',
      input: {
        styles: [
          {
            '[test2]': 'MyComponent_test2',
            '[test]': 'MyComponent_test',
          },
        ],

        props: {
          test: true,
          test2: true,
        },
      },
      expected: [
        'MyComponent_test2',
        'MyComponent_test',
      ],
    },

    {
      capability: 'maintain order of key iteration (different order)',
      input: {
        styles: [
          {
            '[test]': 'MyComponent_test',
            '[test2]': 'MyComponent_test2',
          },
        ],

        props: {
          test: true,
          test2: true,
        },
      },
      expected: [
        'MyComponent_test',
        'MyComponent_test2',
      ],
    },

    {
      capability: '"hoist" toplevel styles',
      input: {
        styles: [
          {
            color: 'black',
            '[test]': {color: 'red'},
            backgroundColor: 'orange',
          },
        ],

        props: {
          test: true,
        },
      },
      expected: [
        {
          color: 'black',
          backgroundColor: 'orange',
        },
        {color: 'red'},
      ],
    },

    {
      capability: '"hoist" ::root styles',
      input: {
        styles: [
          {
            '[test]': {color: 'red'},
            '::root': {
              color: 'black',
              backgroundColor: 'orange',
            },
          },
        ],

        props: {
          test: true,
        },
      },
      expected: [
        {
          color: 'black',
          backgroundColor: 'orange',
        },
        {color: 'red'},
      ],
    },

    {
      capability: '"hoist" ::root classNames',
      input: {
        styles: [
          {
            '[test]': {color: 'red'},
            '::root': 'MyComponent',
          },
        ],

        props: {
          test: true,
        },
      },
      expected: [
        'MyComponent',
        {color: 'red'},
      ],
    },

    {
      capability: 'straight-up *ignore* non-string, non-object values inside the array',
      input: {
        styles: [
          true,
          0,
          false,
          null,
          42,
        ],

        props: {},
      },
      expected: [],
    },

    {
      capability: 'handle false style instead of array',
      input: {
        styles: false,
        props: {},
      },
      expected: [],
    },

    {
      capability: 'handle null style instead of array',
      input: {
        styles: null,
        props: {},
      },
      expected: [],
    },

    {
      capability: 'handle undefined style instead of array',
      input: {
        styles: undefined,
        props: {},
      },
      expected: [],
    },

    {
      capability: 'handle totally unspecified style instead of array',
      input: {
      },
      expected: [],
    },

    {
      capability: 'handle [composed][selectors]',
      input: {
        styles: [
          {
            '[test]': {color: 'red'},
            '[test2]': {color: 'white'},
            '[test][test2]': {color: 'black'},
          },
        ],

        props: {
          test: true,
          test2: true,
        },
      },
      expected: [
        {color: 'red'},
        {color: 'white'},
        {color: 'black'},
      ],
    },

    {
      capability: 'only pass [composed][selectors] whose every selector is true',
      input: {
        styles: [
          {
            '[test]': {color: 'red'},
            '[test2]': {color: 'white'},
            '[test][test2]': {color: 'black'},
          },
        ],

        props: {
          test: true,
          test2: false,
        },
      },
      expected: [
        {color: 'red'},
      ],
    },

    {
      capability: 'include the return value from root-level functions in results',
      input: {
        styles: [
          () => {
            return {
              color: 'red',
            };
          },
        ],

        props: {},
      },
      expected: [
        {color: 'red'},
      ],
    },

    {
      capability: 'pass props as the first argument',
      input: {
        styles: [
          ({props: {favoriteColor}}) => {
            return {
              color: favoriteColor,
            };
          },
        ],

        props: {
          favoriteColor: 'red',
        },
      },
      expected: [
        {color: 'red'},
      ],
    },

    {
      capability: 'call functions to compute the value of style properties',
      input: {
        styles: [
          {
            color: ({props: {favoriteColor}}) => {
              return favoriteColor;
            },
          },
        ],

        props: {
          favoriteColor: 'red',
        },
      },
      expected: [
        {color: 'red'},
      ],
    },

    {
      capability: 'call functions to get value with conditional keys',
      input: {
        styles: [
          {
            '[test]': ({props: {favoriteColor}}) => {
              return {
                color: favoriteColor,
              };
            },
          },
        ],

        props: {
          test: true,
          favoriteColor: 'red',
        },
      },
      expected: [
        {color: 'red'},
      ],
    },

    {
      capability: 'call functions to get value of ::root',
      input: {
        styles: [
          {
            '::root': ({props: {favoriteColor}}) => {
              return {
                color: favoriteColor,
              };
            },
          },
        ],

        props: {
          favoriteColor: 'red',
        },
      },
      expected: [
        {color: 'red'},
      ],
    },

    {
      capability: 'call functions to determine the value of individual style properties in ::root objects',
      input: {
        styles: [
          {
            '::root': {
              color: ({props: {favoriteColor}}) => {
                return favoriteColor;
              },
            },
          },
        ],

        props: {
          favoriteColor: 'red',
        },
      },
      expected: [
        {color: 'red'},
      ],
    },

    {
      capability: 'ignore null, false, and undefined',
      input: {
        styles: [
          null,
          false,
          undefined,
        ],
      },
      expected: [
      ],
    },

    {
      capability: 'ignore null, false, and undefined results from callbacks',
      input: {
        styles: [
          () => { return null; },
          () => { return false; },
          () => { return undefined; },
        ],
      },
      expected: [
      ],
    },

    {
      capability: 'concat array results from top-level callbacks',
      input: {
        styles: [
          () => { return ['aaa', 'bbb', 'ccc']; },
        ],
      },
      expected: [
        'aaa',
        'bbb',
        'ccc',
      ],
    },

    {
      capability: 'concat array results from [valid] top-level callbacks',
      input: {
        styles: [
          {
            '[valid]': () => { return ['aaa', 'bbb', 'ccc']; },
          },
        ],

        props: {
          valid: true,
        },
      },
      expected: [
        'aaa',
        'bbb',
        'ccc',
      ],
    },

    {
      capability: 'compute second-order [selectors] from top-level callbacks',
      input: {
        styles: [
          () => {
            return {
              '[test]': {color: 'red'},
            };
          },
        ],

        props: {
          test: true,
        },
      },
      expected: [
        {color: 'red'},
      ],
    },

    {
      capability: 'retain ::pseudo-elements objects',
      input: {
        styles: [
          {
            '::pseudo-element': { color: 'red' },
          },
        ],
      },
      expected: [
        {
          '::pseudo-element': { color: 'red' },
        },
      ],
    },

    {
      capability: 'retain ::pseudo-elements strings',
      input: {
        styles: [
          {
            '::pseudo-element': 'MySubComponent',
          },
        ],
      },
      expected: [
        {
          '::pseudo-element': 'MySubComponent',
        },
      ],
    },

    {
      capability: 'compute ::pseudo-elements top-level functions',
      input: {
        styles: [
          {
            '::pseudo-element': ({props: {currentSubColor}}) => ({color: currentSubColor}),
          },
        ],

        props: {
          currentSubColor: 'red',
        },
      },
      expected: [
        {
          '::pseudo-element': {
            color: 'red',
          },
        },
      ],
    },

    {
      capability: 'not include [invalid]::pseudo-elements',
      input: {
        styles: [
          {
            '[invalid]::pseudo-element': 'Nope',
          },
        ],
      },
      expected: [
      ],
    },

    {
      capability: 'include [valid]::pseudo-elements',
      input: {
        styles: [
          {
            '[valid]::pseudo-element': 'Yep',
          },
        ],

        props: {
          valid: true,
        },
      },
      expected: [
        {'::pseudo-element': 'Yep'},
      ],
    },

    {
      capability: 'include [truthyProps]',
      input: {
        styles: [
          {
            '[valid]': 'Yep',
            '[alsoValid]': 'Totally',
          },
        ],

        props: {
          valid: true,
          alsoValid: 1,
        },
      },
      expected: [
        'Yep',
        'Totally',
      ],
    },

    {
      capability: 'not include [falsyProps]',
      input: {
        styles: [
          {
            '[invalid]': 'Nope',
            '[alsoInvalid]': 'Nah',
          },
        ],

        props: {
          invalid: false,
          alsoInvalid: null,
        },
      },
      expected: [
      ],
    },

    {
      capability: 'not include [falsyProps]',
      input: {
        styles: [
          {
            '[doesntEvenExist]': 'NoWay',
          },
        ],

        props: {
        },
      },
      expected: [
      ],
    },

    {
      capability: 'include numeric prop equalities',
      input: {
        styles: [
          {
            '[answer=42]': 'Valid',
          },
        ],

        props: {
          answer: 42,
        },
      },
      expected: [
        'Valid',
      ],
    },

    {
      capability: 'not include numeric prop inequalities',
      input: {
        styles: [
          {
            '[answer=42]': 'Valid',
          },
        ],

        props: {
          answer: 43,
        },
      },
      expected: [
      ],
    },

    {
      capability: 'include string prop equalities',
      input: {
        styles: [
          {
            '[favoriteColor="red"]': 'LikesRed',
          },
        ],

        props: {
          favoriteColor: 'red',
        },
      },
      expected: [
        'LikesRed',
      ],
    },

    {
      capability: 'not include string prop inequalities',
      input: {
        styles: [
          {
            '[favoriteColor="red"]': 'LikesRed',
          },
        ],

        props: {
          favoriteColor: 'green',
        },
      },
      expected: [
      ],
    },

    {
      capability: 'include multiple string prop equalities',
      input: {
        styles: [
          {
            '[work="all"][play=0]': 'DullBoy',
          },
        ],

        props: {
          work: 'all',
          play: 0,
        },
      },
      expected: [
        'DullBoy',
      ],
    },

    {
      capability: 'not include multiple string prop equalities when some are not valid',
      input: {
        styles: [
          {
            '[work="all"][play=0]': 'DullBoy',
          },
        ],

        props: {
          work: 'all',
          play: 1,
        },
      },
      expected: [
      ],
    },

    {
      capability: 'doesn\'t care about whitespace in [prop] selectors',
      input: {
        styles: [
          {
            '[  work ="all"][ play = 0 ]': 'DullBoy',
          },
        ],

        props: {
          work: 'all',
          play: 0,
        },
      },
      expected: [
        'DullBoy',
      ],
    },

    {
      capability: 'include [valid]::pseudo-elements',
      input: {
        styles: [
          {
            '[valid]::pseudo-element': 'Yep',
          },
        ],

        props: {
          valid: true,
        },
      },
      expected: [
        {'::pseudo-element': 'Yep'},
      ],
    },

    {
      capability: 'include :hyphenated-selectors',
      input: {
        styles: [
          {
            '[valid-hyphenated]': 'Yep',
          },
        ],

        props: {
          'valid-hyphenated': true,
        },
      },
      expected: [
        'Yep',
      ],
    },

    {
      capability: 'include [hyphenated-prop-selectors]',
      input: {
        styles: [
          {
            '[valid-hyphenated]': 'Yep',
          },
        ],

        props: {
          'valid-hyphenated': true,
        },
      },
      expected: [
        'Yep',
      ],
    },

    {
      capability: 'include props in callbacks',
      input: {
        styles: [
          {
            color: ({props}) => {
              return props.favoriteColor;
            },
          },
        ],

        props: {
          favoriteColor: 'red',
        },
      },
      expected: [
        {color: 'red'},
      ],
    },
  ],
});
