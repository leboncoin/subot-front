import MaterialTable, {MTableToolbar} from 'material-table';
import {BaseSlackUrl} from '../../globals';
import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown'
import * as _ from 'lodash';
import {ChanId} from "../../globals";
import TableSelect from "./table/select";
import DetailPanel from "./table/detail";

class MessagesTable extends React.Component {
  isLoading(ts, field) {
    if (!this.props.loadingMessage) {
      return false
    }
    const {ts: loadingTs, field: loadingField} = this.props.loadingMessage;
    return loadingTs === ts && loadingField === field;
  }

  PropTypes = {
    messages: PropTypes.array,
    loading: PropTypes.bool
  };

  render() {
    const {props} = this
    const admin = _.get(props, "userInfo.is_admin", false);

    return (
      <MaterialTable
        isLoading={this.props.loading}
        className="MessagesTable"
        title="Messages"
        cellEditable={{
          onCellEditApproved: (status, _oldValue, rowData) => {
            return new Promise((resolve, reject) => {
              props.updateMessage("status", {...rowData, status})
                .then(resolve())
                .catch(e => reject(e))
            })
          }
        }}
        actions={[
          rowData => ({
            icon: "link",
            tooltip: "Go to message",
            onClick: (e, rowData) => window.open(`${BaseSlackUrl}/${ChanId}/p${rowData.ts.split(".").join("")}`, "_blank")
          })
        ]}
        columns={[
          {
            title: 'Date',
            grouping: false,
            field: 'ts',
            type: 'datetime',
            defaultSort: 'asc',
            editable: "never",
            render: rowData =>
              <div>{new Date(parseInt(rowData.ts, 10) * 1000).toISOString().slice(0, 16).replace("T", " ")}</div>
          },
          {title: 'Name', field: 'user_info.profile.real_name', searchable: true, editable: "never"},
          {
            cellStyle: {width: "90%"},
            title: 'Message',
            field: 'text',
            searchable: true,
            grouping: false,
            editable: "never",
            render: rowData => <div>
              <ReactMarkdown source={rowData.text}/>
            </div>
          },
          {
            title: 'Status',
            field: 'status',
            editable: admin ? "always" : "never",
            lookup: {"unresponded": "unresponded", "responded": "responded", "fixed": "fixed"}
          },
          {
            title: 'Tools',
            field: 'tools',
            editable: "never",
            render: rowData => (
              <TableSelect
                id={`${rowData.ts}-tools`}
                editable={admin}
                data={_.get(rowData, "tools") || []}
                loading={this.isLoading(rowData.ts, "tools")}
                handleChange={tools => tools !== rowData.tools && this.props.updateMessage("tools", {...rowData, tools})}
                options={_.map(this.props.tools, "name")}
              />)
          },
          {
            title: 'Tools (AI)',
            field: 'ai_tools',
            editable: "never",
            render: rowData => (
              _.map(rowData.ai_tools, "category")
            )
          },
          {
            title: 'Labels',
            field: 'labels',
            editable: "never",
            render: rowData => (
              <TableSelect
                id={`${rowData.ts}-labels`}
                editable={admin}
                data={_.get(rowData, "labels") || []}
                loading={this.isLoading(rowData.ts, "labels")}
                handleChange={labels => labels !== rowData.labels && this.props.updateMessage("labels", {...rowData, labels})}
                options={_.map(this.props.labels, "name")}
              />)
          },
          {
            title: 'Labels (AI)',
            field: 'ai_labels',
            editable: "never",
            render: rowData => (
              _.map(rowData.ai_labels, "category")
            )
          },
          {
            title: 'Feedback',
            field: 'feedback_status',
            editable: "never"
          }
        ]}
        editable={{
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                this.props.deleteMessage(oldData.ts);
                resolve()
              }, 1000)
            }),
        }}
        data={this.props.messages}
        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        options={{
          grouping: true,
          filtering: true
        }}
        detailPanel={rowData => {
          return (
            <DetailPanel replies={rowData.replies}/>
          )
        }}
      />
    )
  }
}

export default MessagesTable
