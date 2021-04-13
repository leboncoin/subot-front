import React, {useEffect} from "react";
import MaterialTable from "material-table";
import * as _ from "lodash";

export default function TeamTab(props) {
  const {teamMembers, loading, userInfo} = props
  const admin = _.get(userInfo, "is_admin", false);

  useEffect(() => {
    if (teamMembers.length === 0 && !loading) {
      props.fetchTeams()
    }
  }, [teamMembers.length, loading, props])

  return (
    <div>
      <MaterialTable
        isLoading={loading}
        data={teamMembers}
        columns={[
          {title: "Name", field: "name", editable: "always"},
          {title: "ID", field: "slack_id", editable: "always"},
        ]}
        options={{search: false, selection: admin}}
        actions={admin ? [
          {
            tooltip: 'Remove All Selected Users',
            icon: 'delete',
            onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
          }
        ] : []}
        editable={admin ? {
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              props.deleteTeamMember(oldData)
                .then(() => {
                  resolve()
                })
                .catch(e => {
                  reject(e)
                });
            }),
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              props.addTeamMember(newData)
                .then(() => {
                  resolve()
                })
                .catch(e => {
                  reject(e)
                });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              props.editTeamMember(oldData.id, newData)
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
