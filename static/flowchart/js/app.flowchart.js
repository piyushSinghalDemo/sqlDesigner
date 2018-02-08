$(document).ready(function() {





      var data1 = '{"operators":{"operator1":{"top":20,"left":20,"properties":{"title":"Operator 1","inputs":{},"outputs":{"output_1":{"label":"Output 1"}}}},"operator2":{"top":80,"left":300,"properties":{"title":"Operator 2","inputs":{"input_1":{"label":"Input 1"},"input_2":{"label":"Input 2"}},"outputs":{}}}},"links":{"1":{"fromOperator":"operator1","fromConnector":"output_1","fromSubConnector":0,"toOperator":"operator2","toConnector":"input_2","toSubConnector":0}},"operatorTypes":{}}'
      var data = {
        operators: {
          operator1: {
            top: 20,
            left: 20,
            properties: {
              title: 'Table 1',
              inputs: {},
              outputs: {
                output_1: {
                  label: '',
                }
              }
            }
          },
          operator2: {
            top: 80,
            left: 300,
            properties: {
              title: 'Table 2',
              inputs: {
                input_1: {
                  label: '',
                },
                input_2: {
                  label: '',
                },
              },
              outputs: {}
            }
          },
        }
      };
      loadData(data)

      // Apply the plugin on a standard, empty div...
      // data = JSON.parse(data1)



    });
      var operatorI = 0;
      function addOp(left, top){
        // /alert()

        var operatorId = 'created_operator_' + operatorI;
        var operatorData = {
          new: true,
          top: top,
          left: left,
          properties: {
            title: 'Table ' + (operatorI + 3),
            inputs: {
              input_1: {
                label: '',
              }
            },
            outputs: {
              output_1: {
                label: '',
              }
            }
          }
        };

        operatorI++;

        $('#droppable').flowchart('createOperator', operatorId, operatorData);
      }
      $('#delete_selected_button').click(function() {
        var a = $('#droppable').flowchart('getData');

        $(".showdata").html(JSON.stringify(a))
      });
      function loadData(data){
          
      }
      function openTableModal(opId){
        var title = $('#droppable').flowchart('getOperatorTitle', opId)
        $(".sb-slidebar").toggleClass("toggleshow", "slow")
        $(".table_name").val(title);
      }

      function getOperatorData(operatorId){

        //   /$('#droppable').flowchart()
          var data = $('#droppable').flowchart('getOperatorData', operatorId);
          return data;
      }

      function setData(operatorId, data){
          $('#droppable').flowchart('setOperatorData', operatorId, data);

      }

      function deleteOperator(operatorId){
          $('#droppable').flowchart('deleteOperator', operatorId);
      }

      function getData(){
        return $('#droppable').flowchart('getData');
      }

      function getOperatorName(operatorId){
          return $('#droppable').flowchart('getOperatorTitle', operatorId);
      }
