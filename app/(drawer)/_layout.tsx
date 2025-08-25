import { View, Text, Image, ImageProps, StyleSheet, Touchable, TouchableOpacity, useWindowDimensions, TextInput } from 'react-native'
import React from 'react'
import { Drawer } from 'expo-router/drawer'
import { Logo, WhiteLogo } from '@/constants/Image'
import { Link, useNavigation, useRouter, } from 'expo-router'
import { AntDesign, Feather, FontAwesome6, Ionicons, Octicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DrawerActions } from '@react-navigation/native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'


const CustomDrawer = (props: any) => {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <View style={{
      width: "100%",
      flex: 1, marginTop: top,
      marginBottom: bottom
    }}>
      <View style={{
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        // width:"100%",
        alignItems: "center"
      }}>
        <View style={{
          backgroundColor: Colors.selected,
          paddingHorizontal: 10,
          width: "90%",
          height: 54,
          borderRadius: 16,
          gap: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center"
        }}>
          <AntDesign name='search1' size={20} color={Colors.dark} />
          <TextInput
            placeholder='Search'
            placeholderTextColor={Colors.grey}
            style={{
              width: "90%"
            }}
          />
          <Link href={'/chat/new'} push asChild>
            <TouchableOpacity>
              <Ionicons
                name="create-outline"
                size={24}
                color={Colors.grey}
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          </Link>
        </View>

      </View>
      <DrawerContentScrollView contentContainerStyle={{ paddingTop: 5 }} {...props}>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{
        flexDirection:"row",
        gap:5,
        paddingHorizontal:16,
        justifyContent:"flex-start",
        alignItems:"center"
      }}>
        <View style={{
          height:50,
          width:50,
          borderRadius:25,
          justifyContent:"center",
          alignItems:"center",
          backgroundColor:Colors.primary
        }}>
          <Text style={{
            fontWeight:"600",
            fontSize:18
          }}>AD</Text>
        </View>
        <View>
          <Text style={{
            fontSize:16,
            fontWeight:"600"
          }}>Adediji Abdulquadri</Text>
          <Text style={{
            fontSize:12,

          }}>adedijiabdulquadri@gamil.com</Text>
        </View>
      </View>
    </View>
  )
}

const DrawerLayout = () => {

  const navigation = useNavigation();
  const dimensions = useWindowDimensions();
  const router = useRouter();
  return (
    <Drawer
      drawerContent={CustomDrawer}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
            style={{ marginLeft: 16 }}>
            <FontAwesome6 name="grip-lines" size={20} color={Colors.grey} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.light,
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Colors.selected,
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#000',
        overlayColor: 'rgba(0, 0, 0, 0.2)',
        drawerItemStyle: { borderRadius: 12 },
        drawerLabelStyle: { marginLeft: -20 },
        drawerStyle: { width: dimensions.width * 0.86 },
      }}>
      <Drawer.Screen
        name="chat/new"
        getId={() => Math.random().toString()}
        options={{
          title: 'ChatGPT',
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: '#000' }]}>
              <Image source={WhiteLogo as ImageProps} style={styles.btnImage} />
            </View>
          ),
          headerRight: () => (
            <Link href={'/chat/new'} push asChild>
              <TouchableOpacity>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={Colors.grey}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      {/* <Drawer.Screen
      name="chat/[id]"
      options={{
        drawerItemStyle: {
          display: 'none',
        },
        headerRight: () => (
          <Link href={'/'} push asChild>
            <TouchableOpacity>
              <Ionicons
                name="create-outline"
                size={24}
                color={Colors.grey}
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          </Link>
        ),
      }}
    /> */}
      <Drawer.Screen
        name="explore"
        options={{
          title: 'Explore GPTs',
          drawerIcon: () => (
            <View
              style={[
                styles.item,
                {
                  backgroundColor: '#fff',
                  width: 28,
                  height: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Octicons name="apps" size={18} color="#000" />
            </View>
          ),
        }}
      />
    </Drawer>
  )
}

const styles = StyleSheet.create({
  searchSection: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.input,
  },
  searchIcon: {
    padding: 6,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    alignItems: 'center',
    color: '#424242',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roundImage: {
    width: 30,
    height: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  item: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  dallEImage: {
    width: 28,
    height: 28,
    resizeMode: 'cover',
  },
});


export default DrawerLayout