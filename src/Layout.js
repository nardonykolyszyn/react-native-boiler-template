import React from "react";
import Routes from "./routes";
import { connect } from "react-redux";
import config from "./ReactotronConfig.js";
import SplashScreen from "react-native-splash-screen";
import * as reactNavigatorService from './redux/services/reactNavigatorService';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    config.connect();
    SplashScreen.hide();
  }

  render() {
    const { signedIn } = this.props;
    const RouteWrapper = Routes(signedIn);
    reactNavigatorService.setNavigator(this.props.navigation);

    return <RouteWrapper />;
  }
}

export default connect(({ auth }) => {
  if (auth.user) {
    return { signedIn: !!auth.user.token };
  }
  return { signedIn: false };
})(Layout);
