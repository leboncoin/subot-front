import * as _ from "lodash";
import React, {useEffect} from "react";
import MaterialTable from 'material-table';

export default function LabelsTab(props) {
  const {labels, loading, userInfo} = props
  const admin = _.get(userInfo, "is_admin", false);

  useEffect(() => {
    if (labels.length === 0 && !loading) {
      props.fetchLabels()
    }
  }, [labels.length, loading, props])

  return (
    <div>
      <MaterialTable
        isLoading={loading}
        data={labels}
        columns={[
          {
            title: "Label",
            defaultSort: 'asc',
            field: "name",
          },
          {
            title: "Regex",
            field: "query.regexp.input",
          },
        ]}
        options={{search: false, selection: admin}}
        actions={admin ? [
          {
            tooltip: 'Remove All Selected Labels',
            icon: 'delete',
            onClick: (evt, data) => {
              const del = window.confirm('Do you really want to delete ' + data.length + ' rows ?')
              if (del) {
                data.map(d => props.deleteLabel(d))
              }
            }
          }
        ] : []}
        editable={admin ? {
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              props.deleteLabel(oldData)
                .then(() => {
                  resolve()
                })
                .catch(e => {
                  reject(e)
                });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              props.editLabel(oldData.id, newData)
                .then(() => {
                  resolve()
                })
                .catch(e => {
                  reject(e)
                });
            }),
          onRowAdd: newData => {
            return new Promise((resolve, reject) => {
              const name = _.get(newData, "name", ""),
                regex = _.get(newData, "query.regexp.input", "")
              props.createLabel(name, regex)
                .then(() => {
                  resolve()
                })
                .catch(e => {
                  reject(e)
                });
            })
          },
        } : {}}
        title={null}
      />
    </div>
  )
}