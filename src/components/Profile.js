import React, {Component} from 'react';
import {Platform, Text, View, TextInput,FlatList, Image, ImageBackground, TouchableOpacity, StatusBar, ScrollView, TouchableNativeFeedback} from 'react-native';
import styles from "../styles/styles";
import Spinner from 'react-native-loading-spinner-overlay';
export default class Profile extends Component {

  constructor(props){
    super(props);
    this.state = { 
      name:'',
      cls:'',
      arr : [],
      city:'',
      age:'',
      mobile : '',
      confirmPasswordError:'',
      passwordError:'',
      emailFormatError:'',
      mobileError:'',
      emailFormatError:'',
      loading: false,
      cardheight:300,
      userId : '',
      visible : false
    }
    
  }

    openMenu = () => {
    this.props.navigation.openDrawer()
  }
  componentDidMount = () => {
    this.setState({visible : true})
    service.getUserData('user').then((keyValue) => {
    console.log('data',JSON.parse(keyValue))
       var data = JSON.parse(keyValue);
       console.log('data', data.userId)
     this.setState({userId : data.userId})
   }, (error) => {
      console.log(error) //Display error
    });
    setTimeout(() => 
    {
    this.getLeads()
     }, 1000)

  }
   submit = () => {
       if (this.state.name && this.state.email && this.state.mobile )
       {
           alert("profile updated successfully")
           // this.props.navigation.navigate('Profile')
       }
       else
       {
           alert("please enter all details both")
       }
      
   }

   getLeads = () => {
    console.log('userid', this.state.userId)
    service.getLead(this.state.userId).then((res) => {
      this.setState({visible : false})
      console.log('data', res)
     this.setState({arr : res.result})

})
   }
  signUp = () =>{
    this.setState(() => ({ cardheight:370}));
    if ( !service.validateEmail(this.state.email)) {
      this.setState(() => ({ emailFormatError: "Proper Email Format is Required"}));
    } 
    else{
      this.setState(() => ({ emailFormatError: ''}));
    }
    if (this.state.email.trim() === "") {
      this.setState(() => ({ emailError: " Email is required."}));
      this.setState(() => ({ emailFormatError: null}));
    } else {
      this.setState(() => ({ emailError: null})); 
    }
    if (this.state.password.trim() === "") {
      this.setState(() => ({ passwordError: " Password is required."}));
    } else {
      this.setState(() => ({ passwordError: null}));
    }
    if (this.state.mobile.trim() === "") {
      this.setState(() => ({ mobileError: " Mobile Number is required."}));
    } else {
      this.setState(() => ({ mobileError: null}));
    }
    if (this.state.confirmPassword.trim() === "") {
      this.setState(() => ({ confirmPasswordError: " Confirm Password is required."}));
    } else {
      this.setState(() => ({ confirmPasswordError: null}));
    }
    if(this.state.email && this.state.mobile && this.state.password && this.state.confirmPassword)
    {
      this.setState(() => ({ cardheight:300}));
    }

    if(this.state.email && this.state.password && this.state.mobile && this.state.confirmPassword && service.validateEmail(this.state.email))
    {
      
     this.setState ({ loading: true});
      setTimeout(() => 
      {this.setState({loading: false})
      this.refs.defaultToastBottom.ShowToastFunction('SignUp SuccessFully');
      this.props.navigation.navigate('Login')
       }, 3000)
      }

  
   // alert(this.state.password)
   }
   goBack = () =>{
    this.props.navigation.pop()
   }
  render() {
      const  NewImage =   <Image source={require('../images/78.png')} style={styles.profilePic}/>
    return (
    
      <View style={{flex:1}}>
         <Spinner visible={this.state.visible} color='#8e44ad' tintColor='#8e44ad' animation={'fade'} cancelable={false} textStyle={{ color: '#FFF' }} />
         <View style={styles.toolbar}>
         <Text style={styles.toolbarButton}></Text>
                    <Text style={styles.toolbarTitle}>My Leads</Text>
                    <TouchableOpacity>
                    <Image style={{width:30,marginRight:10,  height:30}}></Image>
                    </TouchableOpacity>
                </View>
                {this.state.arr.length ==0 ? <Text style={{textAlign : 'center', marginTop:20, fontSize:25}}>No Record Found</Text> : <FlatList
              data={this.state.arr}
              keyExtractor={(item, index) => index}
              style={styles.listCardWidth}
              extraData={this.state.jobs}
              renderItem={({ item, index }) => (
                <View style={{height:280, width:'90%', borderWidth:1, alignSelf : 'center', marginTop:20, borderColor : "#95a5a6"}}>
                  <View style={{flexDirection : 'row'}}><Text style={{margin:5}}>Lead Name</Text>
                  <Text style={{margin:5}}>{item.leadName}</Text>
                  </View>
                  <View style={{flexDirection : 'row'}}><Text style={{margin:5}}>Lead Contact</Text>
                  <Text style={{margin:5}}>{item.leadContact}</Text>
                  </View>
                  <View style={{flexDirection : 'row'}}><Text style={{margin:5}}>Lead City</Text>
                  <Text style={{margin:5}}>{item.leadCity}</Text>
                  </View>
                  <View style={{flexDirection : 'row'}}><Text style={{margin:5}}>Lead Country</Text>
                  <Text style={{margin:5}}>{item.leadCountry}</Text>
                  </View>
                  <View style={{flexDirection : 'row'}}><Text style={{margin:5}}>Lead Pref Country</Text>
                  <Text style={{margin:5}}>{item.leadPrefCountry}</Text>
                  </View>
                  <View style={{flexDirection : 'row'}}><Text style={{margin:5}}>Lead Pref College</Text>
                  <Text style={{margin:5}}>{item.leadPrefCountry}</Text>
                  </View>
                  <View style={{flexDirection : 'row'}}><Text style={{margin:5}}>Lead Pref Program</Text>
                  <Text style={{margin:5}}>{item.leadPrefProgram}</Text>
                  </View>
                  <View style={{flexDirection : 'row'}}><Text style={{margin:5}}>Lead IELTS</Text>
                  <Text style={{margin:5}}>{item.leadIelts}</Text>
                  </View>
                  <View style={{flexDirection : 'row'}}><Text style={{margin:5}}>Lead INTAKE</Text>
                  <Text style={{margin:5}}>{item.leadIeltsIntake}</Text>
                  </View>
                </View>
              )}
            />}
                
               
      </View>
      
    );
}


}