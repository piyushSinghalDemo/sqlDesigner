export default {
  'dataStr': {"business_objs" : {"name" : "","date" : "","data" : ""}, "workflow" : {}, "dbData":{}},
  'purgeForm': {driverTable: "", commitSize: ""},
  'spForm': {sp: "", inputVariables: "", outputVariables: ""},
  'conditionForm': {stepName: "", description: ""},
  'archiveForm': {driverTable: "", allowSelectiveRestore: false, duplicateProcessing: "", commitSize: ""},
  'copyForm': {driverTable: "", table: "", truncateDestBeforeCopy: "", incrementalCopy: "", commitSize: ""},
  'reportForm': {source: "", description: "", dataSource: "", incrementalCopy: "", commitSize: ""},
  'duplicateForm': {comapre_table_view: "", with_table_view:""},
  'operatorOptions': {
                  "db": {name: "db", operatorType: "oneInOneOutOperator", dblClick: true, modal:false, modalName: "myModal"},
                  "spstep": {name: "spstep", operatorType: "oneInOneOutOperator", dblClick: true, modal:true, modalName: "spStepModal"},
                  "merge": {name: "merge", operatorType: "twoInOneOutOperator", dblClick: true, modal:true, modalName: "myModal"},
                  "if-else": {name: "if-else", operatorType: "oneInTwoOutOperator", dblClick: true, modal:true, modalName: "conditionalModal"},
                  "minus": {name: "minus", operatorType: "twoInOneOutOperator", dblClick: true, modal:true, modalName: "myModal"},
                  "purge": {name: "purge", operatorType: "oneInZeroOutOperator", dblClick: true, modal:true, modalName: "purgeModal"},
                  "archive": {name: "archive", operatorType: "oneInZeroOutOperator", dblClick: true, modal:true, modalName: "archiveModal"},
                  "copy": {name: "copy", operatorType: "oneInZeroOutOperator", dblClick: true, modal:true, modalName: "copyModal"},
                  "report": {name: "report", operatorType: "oneInZeroOutOperator", dblClick: true, modal:true, modalName: "reportModal"},
                  "duplicate": {name: "duplicate", operatorType: "oneInOneOutOperator", dblClick: true, modal:true, modalName: "duplicateModal"},
                  "table": {name: "table", operatorType: "addTableOperator", dblClick: false, modal:false, modalName: "myModal"},
                  "sale_order": {name: "sale_order", operatorType: "addTableOperator", dblClick: true, modal:true, modalName: "myModal"},
                  "work_order": {name: "work_order", operatorType: "addTableOperator", dblClick: true, modal:true, modalName: "myModal"},
                  "pur_order": {name: "pur_order", operatorType: "addTableOperator", dblClick: true, modal:true, modalName: "myModal"},
                },
  'operators':[{name: "Equal", symbol: "="},{name: "Greater and Equal", symbol: ">="},{name: "Less and Equal", symbol: "<="},{name: "Not Equal", symbol: "!="},{name: "Like", symbol: "%"}],
  'blockData': {top:0, left:0, properties: {title:"", inputs:{}, outputs: {}, where: [], or: []}},

  methods: {
    oneInZeroOutOperator(operatorI, className, top, left){
      var operatorData = {
        new: true,
        className: className,
        top: top,
        left: left,
        data: {},
        properties: {
          title: 'Table ' + (operatorI + 3),
          inputs: {
            input_1: {
              label: '',
            }
          },
          outputs: {

          }
        }
      };
      return operatorData
    },
    oneInOneOutOperator(operatorI, className, top, left){
      var operatorData = {
        new: true,
        className: className,
        top: top,
        left: left,
        data: {},
        properties: {
          title: 'Table ' + (operatorI + 3),
          inputs: {
            input_1: {
              label: '',
            }
          },
          outputs: {
            output_1: {
              label: ''
            }
          }
        }
      }
      return operatorData
    },
    oneInTwoOutOperator(operatorI, className, top, left){
      var operatorData = {
        new: true,
        className: className,
        top: top,
        left: left,
        data: {},
        properties: {
          title: 'Table ' + (operatorI + 3),
          inputs: {
            input_1: {
              label: '',
            }
          },
          outputs: {
            output_1: {
              label: ''
            },
            output_2:{
              label:''
            }
          }
        }
      }

      return operatorData
    },
    twoInOneOutOperator(operatorI, className, top, left){
      var operatorData = {
        new: true,
        className: className,
        top: top,
        left: left,
        data: {},
        properties: {
          title: 'Table ' + (operatorI + 3),
          inputs: {
            input_1: {
              label: '',
            },
            input_2:{
              label:''
            }
          },
          outputs: {
            output_1: {
              label: ''
            }
          }
        }
      }
      return operatorData
    },
    twoInTwoOutOperator(operatorI, className, top, left){
      var operatorData = {
        new: true,
        className: className,
        top: top,
        left: left,
        data: {},
        properties: {
          title: 'Table ' + (operatorI + 3),
          inputs: {
            input_1: {
              label: '',
            },
            input_2: {
              label: '',
            }
          },
          outputs: {
            output_1: {
              label: ''
            },
            output_2: {
              label: ''
            }
          }
        }
      }
      return operatorData
    }
  }
}
