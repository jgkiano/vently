import { TabNavigator, StackNavigator } from 'react-navigation';

//screens
import WelcomeScreen from './screens/Welcome';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import InterestsScreen from './screens/Interests';
import FeedScreen from './screens/Feed';


const MainNavigator = TabNavigator({
    interests: { screen: InterestsScreen },
    register: { screen: RegisterScreen },
    welcome: { screen: WelcomeScreen },
    login: { screen: LoginScreen },
    feed: { screen: FeedScreen }

}, {
    navigationOptions: {
        tabBarVisible: false
    }
});

export default MainNavigator;
