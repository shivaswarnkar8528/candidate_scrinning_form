
const testTechnologyOption = [
    { value: 'react', label: 'React' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' }
  ];
  const testTypeOptions = [
    { value: 'mcq', label: 'MCQ' },
    { value: 'descriptive', label: 'Descriptive' },
    { value: 'programming', label: 'Programming' },
  
  ];

  const ManagedBy = [
    { value: 'candidate', label: 'Candidate' },
    { value: 'agent', label: 'Agent' },

  ]

  const ScreeningType=[
    {value:"preinterview",label:"Pre Interview"},
    {value:"postInterview",label:"Post Interview"}
  ]
  const questionLevel=[
    {value:"beginner",label:"Beginner"},
    {value:"intermediate",label:"Intermediate"},
    {value:"advance",label:"Advance"},

    
  ]
  export {testTechnologyOption,ManagedBy,ScreeningType,testTypeOptions,questionLevel}