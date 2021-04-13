import React, {useEffect} from "react";
import MaterialTable from 'material-table';
import * as _ from "lodash";

export default function ToolsTab(props) {
  const {tools, loading, userInfo} = props
  const admin = _.get(userInfo, "is_admin", false);

  useEffect(() => {
    if (tools.length === 0 && !loading) {
      props.fetchTools()
    }
  }, [tools.length, loading, props])

  return (
    <div>
      <MaterialTable
        isLoading={loading}
        data={tools}
        columns={[
          {
            title: "Tool",
            defaultSort: 'asc',
            field: "name",
            editable: "always"
          },
          {title: "Regex", field: "query.regexp.input", editable: "always"},
        ]}
        options={{search: false, selection: admin}}
        actions={admin ? [
          {
            tooltip: 'Remove All Selected Tools',
            icon: 'delete',
            onClick: (evt, data) => {
              const del = window.confirm('Do you really want to delete ' + data.length + ' rows ?')
              if (del) {
                data.map(d => props.deleteTool(d))
              }
            }
          }
        ] : []}
        editable={admin ? {
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              props.deleteTool(oldData)
                .then(() => {
                  resolve()
                })
                .catch(e => {
                  reject(e)
                });
            }),
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              const name = _.get(newData, "name", ""),
                regex = _.get(newData, "query.regexp.input", "")
              props.createTool(name, regex)
                .then(() => {
                  resolve()
                })
                .catch(e => {
                  reject(e)
                });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              props.editTool(oldData.id, newData)
                .then(() => {
                  resolve()
                })
                .catch(e => {
                  reject(e)
                });
            })
        } : {}}
        title={null}
      />
    </div>
  )
}