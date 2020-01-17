import React, { Component} from 'react'
import {View, Text, Image,TextInput,  Dimensions, TouchableOpacity, FlatList,  Modal, TouchableHighlight, ScrollView} from 'react-native'
import styles from "../styles/styles";
// import {  Card, Divider, SearchBar, List, ListItem  } from 'react-native-elements';
// import MapView from 'react-native-maps'
// import Geolocation from '@react-native-community/geolocation';
// import Stars from 'react-native-stars';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Service from "../services/Service";
import Spinner from 'react-native-loading-spinner-overlay';
import * as authaction from '../actions/authaction'

 class Home2 extends Component {

  constructor (props) {
    super (props)
    this.state = {
      listView : true,
      mapView : false, 
      longitude : "", 
      latitude : "",
      posts : [],
      visible : false,
      places : [{heart : true},
        {heart : true},
        {heart : true},
        {heart : true},
        {heart : true},
        {heart : true}],

      modalVisible: false,
      guest : false
      
    }
    service = new Service()
  }

  onFocusFunction = () => {
if(this.props.navigation.state.params)
    {
      if(this.props.navigation.state.params.guest === "guest")
      {
      //  alert("this one")
        this.setState({ guest: true})
      }
      else
      {
     //   alert("this fired")
          this.setState({ guest: false})
      }
    }
    else
    {
    //  alert("this")
    }
}


    goToPage = (page) => {
        this.props.navigation.navigate(page)
    }

    makeItem = () => {
        return {
            heart : false
          };
    }
   openScreen = (val) => {
    this.props.navigation.navigate(val)

   }
    setView = (val) => {
      if(val == "list" ) {
        this.setState({mapView: false, listView: true}) 
      }else{
        this.setState({mapView: true, listView: false}) 
        }
      }
    componentDidMount = () => {
      console.log('im working')
  // alert(JSON.stringify(this.props))
//  this.setState({visible : true})
     this.focusListener = this.props.navigation.addListener('didFocus', () => {
    this.getPosts()
  })
     // Geolocation.requestAuthorization();
    //   this.getProfiles()
    //   // Geolocation.getCurrentPosition(info => this.sendLocation(info));
    //   Geolocation.getCurrentPosition(
    //     (position) => {
    //       console.log('Position -> ',position);
    //       this.setState({latitude : position.coords.latitude, longitude : position.coords.longitude})
    //     },
    //     (error) => console.log(error, 'error')
        
    // );
    }

       getPosts = () => {
    service.getPosts().then((res) => {
    if(res.success == "true") {
      this.setState({visible : false})
      //alert(JSON.stringify(res))
     this.setState({posts : res.result})
    }
        })
}






detail = () => {
 if(this.state.guest == false)
 {
    this.props.navigation.navigate("Details")
 }
}
   
    getCategoriesPlaces = () => {
      service.getCategories().then(res => {
        console.log("myres", res);
       
      });
    }
    getProfiles = () => {
     //  service.getProfiles().then(res => {
     //    console.log("new", res);
     // //   this.setState({places : res.profileList})
     //  });
    }
   
    searchFilterFunction = text => {
      this.setState({
         value: text,
       });
   
      
     }

     toggleModal(visible) {
      this.setState({ modalVisible: visible });
      if(visible == false) {
         this.props.navigation.navigate("Home")
      }
   }
     openMenu = () => {
    this.props.navigation.openDrawer()
  }
render () { 
return (<View style={styles.container}>
   <Spinner visible={this.state.visible} color='#8e44ad' tintColor='#8e44ad' animation={'fade'} cancelable={false} textStyle={{ color: '#FFF' }} />
  <View style={styles.toolbar}>
                     <TouchableOpacity style={styles.toolbarButton}>
                    <Image style={{width:30, marginLeft:5, marginTop :0,  height:30, }}></Image>
                    </TouchableOpacity>

                    <Text style={styles.toolbarTitle}>Parsome</Text>
                     <TouchableOpacity>
                    <Image style={{width:30,marginRight:20,  height:30}} source={require('../images/notification.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openMenu()}>
                    <Image style={{width:30,marginRight:10,  height:30}} source={require('../images/menu.png')}></Image>
                    </TouchableOpacity>
                </View>
               
                
       
                
   <View style={{height:400, width:'90%', borderWidth:1, alignSelf : 'center', marginTop:10, borderColor : "#95a5a6"}}>
    <View style={styles.listCenter}>
       {this.state.posts.length ==0 ? <Text style = {styles.defaultTextSize}>{this.state.dummyText}</Text> : null}
        <FlatList
              data={this.state.posts}
              keyExtractor={(item, index) => index}
              style={styles.listCardWidth}
              extraData={this.state.posts}
              renderItem={({ item, index }) => (
                <View>
                <TouchableOpacity onPress={() => this.goToPostproject()}>
                          <Image source={{uri : item.postImage}} style={{width:"100%", height :  Dimensions.get('window').height-350, marginTop:20}} />
                           </TouchableOpacity>
                    <TouchableOpacity style={styles.listCard} on>
                     <View style={styles.rowAlignSideMenuRequest}>
                          <View style={styles.firstText}> 
                          <Text style={{margin:10, fontWeight :'500', fontSize:25,  textTransform: 'capitalize'}}> {item.postTitle} 
                          </Text>
                          </View>
                          <View style={styles.emptyText}> 
                          </View>
                          <View> 
                          <Text style={{margin:5, fontWeight :'500', fontSize:15,  textTransform: 'capitalize'}}> {item.postDescription}
                          </Text>
                          </View>
                      </View>
                     
                        </TouchableOpacity>
                </View>
              )}
            />
        </View>
   </View>
   


    
  
 

     
  
      
    </View>)} 
      
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.logindata
    };
  }

 function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authaction, dispatch)
    };
  }


export default connect(mapStateToProps, mapDispatchToProps)(Home2);