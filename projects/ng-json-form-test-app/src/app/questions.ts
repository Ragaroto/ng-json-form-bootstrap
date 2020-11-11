export const questions = {
  textboxExample: {
    key: 'textboxExample',
    controlType: 'textbox',
    label: 'Textbox Question',
    helpText: 'Please provide all information',
    required: false,
    order: 1,
    disabled: true,
    size: 12,
    type: 'text',
    value: 'The house of sunshine',
    
  },
  rangeExample: {
    key: 'rangeExample',
    controlType: 'range',
    label: 'Range question',
    step: 1,
    min: 50,
    max: 100,
    value: 25,
    order: 2,
    required: true,
    helpText: 'Please provide all information',
    readonly: false,
    disabled: false,
    size: 12,
    placeholder: ''
  },
  DropdownExample: {
    key: 'DropdownExample',
    controlType: 'dropdown',
    label: 'Dropdown question',
    required: true,
    order: 4,
    trackKey: 'id',
    viewValue: 'label',
    helpText: 'Please provide all information',
    value: {
      label: 'Apartament',
      id: 1
    },
    options: [
      {
        label: 'Apartament',
        id: 1
      },
      {
        label: 'House',
        id: 2
      },
      {
        label: 'Flat',
        id: 3
      }
    ]
  },
  RadioExample: {
    key: 'RadioExample',
    controlType: 'radio',
    label: 'Radio Question',
    required: true,
    order: 4,
    trackKey: 'id',
    viewValue: 'label',
    value: 2,
    options: [
      {
        label: 'radio option 01',
        id: 1
      },
      {
        label: 'radio option 02',
        id: 2
      },
      {
        label: 'radio option 03',
        id: 3
      }
    ],
    readonly: false,
    disabled: false,
    size: null,
    helpText: '',
    placeholder: ''
  },
  CheckBoxExampleA: {
    key: 'CheckBoxExampleA',
    controlType: 'checkbox',
    label: 'Checkbox item A',
    required: true,
    order: '8',
    value: null,
    readonly: false,
    disabled: false,
    size: null,
    helpText: '',
    placeholder: ''
  },
  CheckBoxExampleB: {
    key: 'CheckBoxExampleB',
    controlType: 'checkbox',
    label: 'Checkbox item B',
    required: true,
    order: '10',
    value: null,
    readonly: false,
    disabled: false,
    size: null,
    helpText: '',
    placeholder: ''
  },
  TextAreaExample: {
    key: 'TextAreaExample',
    controlType: 'textarea',
    label: 'Textarea question',
    rows: 3,
    order: 8,
    required: true,
    minLength: 2,
    maxLength: 100,
    readonly: false,
    disabled: false,
    size: 12,
    helpText: 'Hello, leave a cool message',
    placeholder: 'My Placeholder'
  }
};
