import React, {useEffect} from "react";
import MaterialTable from 'material-table';
import * as _ from "lodash";

export default function AnswersTab(props) {
  const {answers, tools, labels, loading, userInfo} = props
  const admin = _.get(userInfo, "is_admin", false);

  useEffect(() => {
    if (loading)
      return;
    if (answers.length === 0) {
      props.fetchAnswers()
    }
    if (tools.length === 0) {
      props.fetchTools()
    }
    if (labels.length === 0) {
      props.fetchLabels()
    }
  }, [answers.length, tools.length, labels.length, loading, props])

  return (
    <div>
      <MaterialTable
        isLoading={loading}
        data={answers}
        columns={[
          {
            title: 'Tool',
            field: 'tool',
            defaultSort: 'asc',
            lookup: _.reduce(_.sortBy(tools, "name"), (acc, t) => {
              acc[_.get(t, 'name')] = _.get(t, 'name');
              return acc
            }, {})
          },
          {
            title: 'Label',
            field: 'label',
            lookup: _.reduce(_.sortBy(labels, "name"), (acc, l) => {
              acc[_.get(l, 'name')] = _.get(l, 'name');
              return acc
            }, {})
          },
          {title: "Answer", field: "answer", editable: "always"},
          {title: "Feedback", field: "feedback", editable: "always", type: "boolean"},
        ]}
        options={{search: false, selection: admin}}
        actions={admin ? [
          {
            tooltip: 'Remove All Selected Answers',
            icon: 'delete',
            onClick: (evt, data) => {
              const del = window.confirm('Do you really want to delete ' + data.length + ' rows ?')
              if (del) {
                data.map(d => props.deleteAnswer(d))
              }
            }
          }
        ] : []}
        editable={admin ? {
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              props.deleteAnswer(oldData).then(() => resolve()).catch(e => reject(e));
            }),
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              props.createNewAnswer(newData)
                .then(() => {
                  resolve()
                })
                .catch(e => {
                  reject(e)
                });
            }),
          onRowUpdate: (newData) =>
            new Promise((resolve, reject) => {
              props.editAnswer(newData).then(() => resolve()).catch(e => reject(e));
            }),
        } : {}}
        title={null}
      />
    </div>
  )
}