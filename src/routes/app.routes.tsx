import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { Home } from '../screens/Home';
import { Details } from '../screens/Details';
import { Register } from '../screens/Register';
import { SignUp } from '../screens/SignUp';
import { SignIn } from '../screens/SignIn';
import { Loading } from '../components/Loading';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth()
      .onAuthStateChanged(response => {
        setUser(response);
        setIsLoading(false);
      });

    return subscriber;
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user ? <Screen name="home" component={Home} /> : <Screen name="home" component={SignIn} />} 
      <Screen name="new" component={Register} />
      <Screen name="details" component={Details} />
      <Screen name="signup" component={SignUp} />
    </Navigator>
  )
}