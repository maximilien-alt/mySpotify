import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import MusicScreen from './screens/MusicScreen';

const MainNavigator = createStackNavigator ({
  Home: { screen: HomeScreen },
  Music: { screen: MusicScreen }
});

const App = createAppContainer(MainNavigator);

export default App;