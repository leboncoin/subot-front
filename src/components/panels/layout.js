import React from 'react';
import AppToolbar from "./toolbar";
import Menu from "../../containers/panels/menu";
import Notifs from '../../containers/panels/notifs';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <AppToolbar
          displayCalendar={this.props.activeRoute==="/support"}
          header={this.props.header}
          menuOpen={this.props.menuOpen}
          toggleMenu={this.props.toggleMenu}
        />
        <Menu
          open={this.props.menuOpen}
          active={this.props.activeRoute}
          onToggle={this.props.toggleMenu}
        />
        <Notifs/>
      </div>
    );
  }
}

export default Layout;