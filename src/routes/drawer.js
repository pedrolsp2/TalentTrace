import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import EditPassword from '../pages/Components/Settings/EditPassword'
import EditSkills from '../pages/Components/Settings/EditSkills'

const Drawer = createDrawerNavigator();

function MyDrawer(){
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="EditPassword" component={EditPassword} />
      <Drawer.Screen name="EditSkills" component={EditSkills} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;