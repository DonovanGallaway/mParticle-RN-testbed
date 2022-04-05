/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState, useEffect} from 'react';
 // import Intercom from '@intercom/intercom-react-native';
 import {Node} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Platform,
   Text,
   useColorScheme,
   View,
   Image,
   TextInputComponent
 } from 'react-native';
 import {
   Button,
   Modal,
   Portal,
   Provider,
   TextInput,
   Dialog,
   Divider,
   RadioButton,
   Chip,
   BottomNavigation
 } from 'react-native-paper'
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 import MParticle from 'react-native-mparticle'
 
 const Section = ({children, title}) => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 };
 
 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   // Intercom.registerUnidentifiedUser()
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   const [mpid, setMpid] = useState("")
   const [recentActivity, setRecentActivity] = useState("Opened App")
   const [flip, setFlip] = useState(true)
  //  const [objectReader, setObjectReader] = useState({})
 
   useEffect(() => {
    //  MParticle.Identity.getCurrentUser((currentUser) => {
    //    setMpid(currentUser.userId)
    //  })
   });
 
   const testLogs = () => {
     // MParticle.Identity.getCurrentUser((currentUser) => {
     //   let user = new MParticle.User(currentUser.userId)
     //   user.getUserIdentities((identities) => {
     //     if(!(identities["1"] && identities["7"])){
     //       console.log("working")
     //     } else {
     //       console.log("not notworking")
     //     }
     //   })
     // })
     setFlip(flip == false ? true : false)
     if(flip){
       console.log("Login Custom Activated")
     } else {
       console.log("Login Custom Deactivated")
     }
     console.log(flip)
   }
 
   // ID Sync
   const [loginVal, setLoginVal] = useState("")
   const [selectedLogin, setSelectedLogin] = useState("email")
   const [checkedLogin, setCheckedLogin] = useState("email")
   const [modal, setModal] = useState("")
   const [loginIDs, setLoginIDs] = useState(false)
 
   const loginEventTest = () => {
     if(flip){
       MParticle.logEvent('Test event Login', MParticle.EventType.Other, { 'Test key': 'Test value' })
       console.log("success")
     }
     console.log(flip)
   }
 
   const loginIdentity = () => {
     var request = new MParticle.IdentityRequest();
     request[selectedLogin] = loginVal;
     request.setCustomerID("testInter5")
 
     MParticle.Identity.login(request, (error, userId) => {
         if (error) {
             console.debug(error); //error is an MParticleError
         } else {
           MParticle.Identity.getCurrentUser((currentUser) => {
             setMpid(currentUser.userId)
             // console.log(MParticle.User.getUserIdentities(currentUser.userId));
             // console.log(MParticle.UserIdentityType)
             // console.log(MParticle.UserAttributeType)
           });
           flip && MParticle.logEvent('Test event Login', MParticle.EventType.Other, { 'Test key': 'Test value' })
         }
     });
 
     // Intercom.registerIdentifiedUser({email: loginVal ,userID: "testInter5"})
 
     setModal("")
     setRecentActivity("Logged In")
   }
 
   const logoutIdentity = () => {
     var request = new MParticle.IdentityRequest();
 
     MParticle.Identity.logout(request, (error, userId) => {
         if (error) {
             console.debug(error);
         } else {
             setMpid(userId)
             console.log(userId);
         }
     });
 
     // Intercom.logout()
 
     setRecentActivity("Logged Out")
   }
 
   const cancelLoginOption = () => {
     setCheckedLogin(selectedLogin)
     setLoginIDs(false)
   }
 
   const confirmLoginOption = () => {
     setSelectedLogin(checkedLogin)
     setLoginIDs(false)
     setLoginVal("")
   }
 
   const parseIDs = (str) => {
     if(str === "customerId"){
       return "Customer ID"
     } else {
       return "Email"
     }
   }
 
   // Attributes
   const [attrVal, setAttrVal] = useState("")
   const [selectedAttr, setSelectedAttr] = useState("FirstName")
   const [checkedAttr, setCheckedAttr] = useState("FirstName")
   const [attrsOptions, setAttrsOptions] = useState(false)
 
   const cancelAttrOption = () => {
     setCheckedAttr(selectedAttr)
     setAttrsOptions(false)
   }
 
   const confirmAttrOption = () => {
     setSelectedAttr(checkedAttr)
     setAttrsOptions(false)
     setAttrVal("")
   }
 
   const parsedAttrs = {
     "FirstName": "First Name",
     "LastName": "Last Name",
     "Gender": "Gender",
     "Age": "Age",
     "MobileNumber": "Mobile Number",
     "Country": "Country",
     "State": "State",
     "City": "City",
     "Address": "Address",
     "Zipcode": "Zip Code"
   }
 
   const setAttribute = () => {
     MParticle.Identity.getCurrentUser((currentUser) => {
       setMpid(currentUser.userId)
     })
 
     let user = new MParticle.User(mpid)
     user.setUserAttribute(selectedAttr, attrVal)
     setModal("")
     setRecentActivity("Set Attribute")
   }
 
   // Events
   const [logEvents, setLogEvents] = useState(false)
   const [eventTypes, setEventTypes] = useState(false)
   const [selectedEventType, setSelectedEventType] = useState("custom")
   const [checkedEventType, setCheckedEventType] = useState("custom")
 
   const cancelETOption = () => {
     setCheckedEventType(selectedEventType)
     setEventTypes(false)
   }
 
   const confirmETOption = () => {
     setSelectedEventType(checkedEventType)
     setEventTypes(false)
   }
 
   // Events -> Log Event
   const [ceName, setCEName] = useState("")
   const [ceTypes, setCETypes] = useState(false)
   const [selectedCEType, setSelectedCEType] = useState("Other")
   const [checkedCEType, setCheckedCEType] = useState("Other")
   const [eventDialog, setEventDialog] = useState("")
 
   const logCustomEvent = () => {
     MParticle.logEvent(ceName, MParticle.EventType.Other, {
       "testKey1": "testVal1",
       "testKey2": ["test1", "test2"]
     })
     setCEName("")
     setModal("")
     setRecentActivity("Logged Custom Event")
   }
 
   // Events -> Log Screen Event
   const [seName, setSEName] = useState("")
 
   const logScreenViewEvent = () => {
     MParticle.logScreenEvent(seName)
     setRecentActivity("Logged Screen View")
   }
 
   // Events -> Purchase Event
   const [productName, setProductName] = useState("")
   const [productSKU, setProductSKU] = useState("")
   const [productPrice, setProductPrice] = useState("0")
   const [productQuantity, setProductQuantity] = useState("1")
   const [transactionId, setTransactionId] = useState("")
 
   const logPurchaseEvent = (params) => {
 
     let name = productName, sku = productSKU, price = +parseFloat(productPrice).toFixed(2), quantity = parseInt(productQuantity)
 
     const product = new MParticle.Product(name, sku, price, quantity < 1 ? 1 : quantity)
     const transactionAttributes = new MParticle.TransactionAttributes(transactionId)
     transactionAttributes.setCouponCode('cool coupon')
    //  const event = MParticle.CommerceEvent.createProductActionEvent(MParticle.ProductActionType.Purchase, [product], transactionAttributes)
    const event = new MParticle.CommerceEvent()
                            .setProductActionType(MParticle.ProductActionType.Purchase)
                            .setProducts([product])
                            .setTransactionAttributes(transactionAttributes)
                            .setCurrency('USD')
                            .setCheckoutStep(2)
                            
     MParticle.logCommerceEvent(event)
 
     setProductName("")
     setProductSKU("")
     setProductPrice("0")
     setProductQuantity("1")
     setTransactionId("")
     setModal("")
     setRecentActivity(`Logged Purchase Event`)
    //  setObjectReader(event)
   }
 
   // Events -> Impression Event
   const [impProductName, setImpProductName] = useState("")
   const [impProductSKU, setImpProductSKU] = useState("")
   const [impProductPrice, setImpProductPrice] = useState("0")
   const [impProductQuantity, setImpProductQuantity] = useState("1")
   const [impListName, setImpListName] = useState("")
 
   const logImpressionEvent = () => {
     let name = impProductName, sku = impProductSKU, price = +parseFloat(impProductPrice).toFixed(2), quantity = parseInt(impProductQuantity)
 
     const product = new MParticle.Product(name, sku, price, quantity < 1 ? 1 : quantity)
     const impression = new MParticle.Impression(impListName, [product])
     const event = MParticle.CommerceEvent.createImpressionEvent([impression])
     
     MParticle.logCommerceEvent(event)
 
     setImpProductName("")
     setImpProductSKU("")
     setImpProductPrice("0")
     setImpProductQuantity("1")
     setImpListName("")
     setModal("")
     setRecentActivity("Logged Impression Event")
   }
 
   // CCPA Consent
   const setCCPAConsent = () => {
     var ccpaConsent = new MParticle.CCPAConsent(true, "ccpa_agreement_v1", new Date().getTime(), "Somewhere in San Francisco", "foo-bar-hardwareId")
     MParticle.setCCPAConsentState(ccpaConsent);
     setRecentActivity("Set CCPA Consent")
   }
 
   const removeCCPaConsent = () => {
     MParticle.removeCCPAConsentState();
     setRecentActivity("Removed Custom Event")
   }
 
 
   return (
     <Provider style={backgroundStyle} >
       <Portal style={styles.portal}>
         <Modal visible={modal === "login" ? true : false} onDismiss={() => setModal("")} style={styles.modal}>
           <View style={styles.modalView}>
               <View style={styles.loginOptionsView}>
                   <Text style={{marginRight: 7, fontSize: 18, fontWeight: '600'}}>Current login ID:</Text>
                   <Button mode="outlined" onPress={() => setLoginIDs(true)}>{`${parseIDs(selectedLogin)} ▼`}</Button>
               </View>
               <TextInput
                   label = {parseIDs(selectedLogin)}
                   value = {loginVal}
                   onChangeText={setLoginVal}
                   mode="outlined"
                   style={styles.input}
               />
               <Button mode="contained" onPress={loginIdentity}>
                   Login
               </Button>
           </View>
         </Modal>
         <Dialog visible={loginIDs} style={styles.loginOptionsDialog} onDismiss={() => setLoginIDs(false)}>
             <Text style={{fontSize: 20, fontWeight: '700', padding: 10}}>Choose a login ID</Text>
             <Divider />
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="email"
                 status={ checkedLogin === 'email' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedLogin('email')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>Email</Text>
             </View>
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="customerId"
                 status={ checkedLogin === 'customerId' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedLogin('customerId')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>Customer ID</Text>
             </View>
             <Divider />
             <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10, alignSelf: 'flex-end'}}>
               <Button mode="contained" style={{marginRight: 10}} onPress={cancelLoginOption}>Cancel</Button>
               <Button mode="contained" onPress={confirmLoginOption}>Ok</Button>
             </View>            
         </Dialog>        
         <Modal visible={modal === "setAttributes" ? true : false} onDismiss={() => setModal("")} style={styles.modal}>
           <View style={styles.modalView}>
             <View style={styles.loginOptionsView}>
               <Text style={{marginRight: 7, fontSize: 18, fontWeight: '600'}}>Current Attribute:</Text>
               <Button mode="outlined" onPress={() => setAttrsOptions(true)}>{`${parsedAttrs[selectedAttr]} ▼`}</Button>
             </View>
             <TextInput
                   label = {parsedAttrs[selectedAttr]}
                   value = {attrVal}
                   onChangeText={setAttrVal}
                   mode="outlined"
                   style={styles.input}
               />
             <Button mode="contained" onPress={setAttribute}>
                 Set Attribute
             </Button>
           </View>
         </Modal>
         <Dialog visible={attrsOptions} style={styles.attrsOptionsDialog} onDismiss={() => setAttrsOptions(false)}>
             <Text style={{fontSize: 20, fontWeight: '700', padding: 10}}>Choose an attribute</Text>
             <Divider />
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="FirstName"
                 status={ checkedAttr === 'FirstName' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedAttr('FirstName')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>First Name</Text>
             </View>
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="LastName"
                 status={ checkedAttr === 'LastName' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedAttr('LastName')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>Last Name</Text>
             </View>
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="Gender"
                 status={ checkedAttr === 'Gender' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedAttr('Gender')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>Gender</Text>
             </View>
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="Age"
                 status={ checkedAttr === 'Age' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedAttr('Age')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>Age</Text>
             </View>
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="MobileNumber"
                 status={ checkedAttr === 'MobileNumber' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedAttr('MobileNumber')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>Mobile Number</Text>
             </View>
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="Country"
                 status={ checkedAttr === 'Country' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedAttr('Country')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>Country</Text>
             </View>
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="State"
                 status={ checkedAttr === 'State' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedAttr('State')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>State</Text>
             </View>
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="City"
                 status={ checkedAttr === 'City' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedAttr('City')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>City</Text>
             </View>
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="Address"
                 status={ checkedAttr === 'Address' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedAttr('Address')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>Address</Text>
             </View>
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="Zipcode"
                 status={ checkedAttr === 'Zipcode' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedAttr('Zipcode')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>Zip Code</Text>
             </View>
             <Divider />
             <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10, alignSelf: 'flex-end'}}>
               <Button mode="contained" style={{marginRight: 10}} onPress={cancelAttrOption}>Cancel</Button>
               <Button mode="contained" onPress={confirmAttrOption}>Ok</Button>
             </View>            
         </Dialog>
         <Modal visible={modal === "logEvents" ? true : false} onDismiss={() => setModal("")} style={styles.modal}>
           <View style={styles.modalView}>
               <View style={styles.loginOptionsView}>
                   <Text style={{marginRight: 7, fontSize: 18, fontWeight: '600'}}>Event Type:</Text>
                   <Button mode="outlined" onPress={() => setEventTypes(true)}>{`${selectedEventType} ▼`}</Button>
               </View>
               {selectedEventType === "custom" && 
                 <View style={{width: "90%", alignItems: "center"}}>
                   <TextInput
                       label = {'Event Name'}
                       value = {ceName}
                       onChangeText={setCEName}
                       mode="outlined"
                       style={styles.input}
                   />
                   <Button mode="contained" onPress={logCustomEvent}>
                     Log Event
                   </Button>
                 </View>
               }
               {selectedEventType === "screen" && 
                 <View style={{width: "90%", alignItems: "center"}}>
                   <TextInput
                       label = {'Screen Event Name'}
                       value = {seName}
                       onChangeText={setSEName}
                       mode="outlined"
                       style={styles.productInput}
                   />
                   <Button mode="contained" onPress={logScreenViewEvent}>
                     Log Screen Event
                   </Button>
                 </View>
               }
               {selectedEventType === "purchase" && 
                 <View style={{width: "90%", alignItems: "center"}}>
                   <Text>Product Attributes</Text>
                   <TextInput
                       label = {'Name'}
                       value = {productName}
                       onChangeText={setProductName}
                       mode="flat"
                       style={styles.productInput}
                   />
                   <TextInput
                       label = {'SKU'}
                       value = {productSKU}
                       onChangeText={setProductSKU}
                       mode="flat"
                       style={styles.productInput}
                   />
                   <TextInput
                       label = {'Price'}
                       value = {productPrice}
                       onChangeText={setProductPrice}
                       keyboardType = 'numeric'
                       mode="flat"
                       style={styles.productInput}
                   />
                   <TextInput
                       label = {'Quantity'}
                       value = {productQuantity}
                       onChangeText={setProductQuantity}
                       keyboardType = 'numeric'
                       mode="flat"
                       style={styles.productInput}
                   />
                   <Divider />
                   <Text>Transaction Attributes</Text>
                   <TextInput
                       label = {'Transaction ID'}
                       value = {transactionId}
                       onChangeText={setTransactionId}
                       mode="outlined"
                       style={styles.input}
                   />
                  <Button mode="contained" onPress={logPurchaseEvent}>
                   Log Purchase Event
                  </Button>
                 </View>
               }
               {selectedEventType === "impression" && 
                 <View style={{width: "90%", alignItems: "center"}}>
                   <Text>Impression Product Attributes</Text>
                   <TextInput
                       label = {'Name'}
                       value = {impProductName}
                       onChangeText={setImpProductName}
                       mode="flat"
                       style={styles.productInput}
                   />
                   <TextInput
                       label = {'SKU'}
                       value = {impProductSKU}
                       onChangeText={setImpProductSKU}
                       mode="flat"
                       style={styles.productInput}
                   />
                   <TextInput
                       label = {'Price'}
                       value = {impProductPrice}
                       onChangeText={setImpProductPrice}
                       keyboardType = 'numeric'
                       mode="flat"
                       style={styles.productInput}
                   />
                   <TextInput
                       label = {'Quantity'}
                       value = {impProductQuantity}
                       onChangeText={setImpProductQuantity}
                       keyboardType = 'numeric'
                       mode="flat"
                       style={styles.productInput}
                   />
                   <Divider />
                   <Text>Impression Attributes</Text>
                   <TextInput
                       label = {'Impression List Name'}
                       value = {impListName}
                       onChangeText={setImpListName}
                       mode="outlined"
                       style={styles.input}
                   />
                  <Button mode="contained" onPress={logImpressionEvent}>
                   Log Impression Event
                  </Button>
                 </View>
               }
           </View>
         </Modal>
         <Dialog visible={eventTypes} style={styles.eventTypessDialog} onDismiss={() => setEventTypes(false)}>
             <Text style={{fontSize: 20, fontWeight: '700', padding: 10}}>Choose an event type</Text>
             <Divider />
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="custom"
                 status={ checkedEventType === 'custom' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedEventType('custom')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>Custom</Text>
             </View>
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="screen"
                 status={ checkedEventType === 'screen' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedEventType('screen')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>Screen View</Text>
             </View>
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="purchase"
                 status={ checkedEventType === 'purchase' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedEventType('purchase')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>Purchase</Text>
             </View>
             <View style={styles.loginButtonView}>
               <RadioButton
                 value="impression"
                 status={ checkedEventType === 'impression' ? 'checked' : 'unchecked' }
                 onPress={() => setCheckedEventType('impression')}
                 color="#4702b0"
               />
               <Text style={styles.loginButtonTitle}>Impression</Text>
             </View>
             <Divider />
             <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10, alignSelf: 'flex-end'}}>
               <Button mode="contained" style={{marginRight: 10}} onPress={cancelETOption}>Cancel</Button>
               <Button mode="contained" onPress={confirmETOption}>Ok</Button>
             </View>            
         </Dialog>
         <Modal visible={modal === "setConsent" ? true : false} onDismiss={() => setModal("")} style={styles.modal}>
           <View style={styles.modalView}>
           <Text style={{fontSize: 20, fontWeight: '700', padding: 10, marginBottom: 50}}>Choose CCPA Consent Option</Text>
             <Button mode="contained" style={{marginBottom: 20, width: "70%"}} onPress={setCCPAConsent}>Set CCPA Consent</Button>
             <Button mode="contained" style={{width: "70%"}} onPress={removeCCPaConsent}>Remove CCPA Consent</Button>
           </View>
         </Modal>
       </Portal>
       <Image
         style={{width: 300, height: 75, alignSelf: 'center', marginTop: 60}}
         source={require('./logos/mparticle-vector-logo.png')}
       />
       <Text style={{alignSelf: 'center'}}>Mo React Native Test App</Text>
       <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 40}}>
         <Text style={styles.loginButtonTitle}>Current User ID: </Text>
         <Text>{mpid}</Text>
       </View>
       <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 50}}>
         <Text style={styles.loginButtonTitle}>Most Recent Activity: </Text>
         <Text>{recentActivity}</Text>
       </View>
       {/* <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 50}}>
         <Text style={styles.loginButtonTitle}>Object Reader: </Text>
        </View>
         {Object.keys(objectReader).map(x=>{
           return (
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 50}}>
              <Text>{x}</Text>
            </View>

         )})} */}
       <Button style={styles.homeButton} mode="contained" onPress={() => setModal("login")}>
         Login Identity
       </Button>
       <Button style={styles.homeButton} mode="contained" onPress={logoutIdentity}>
         Logout Identity
       </Button>
       <Button style={styles.homeButton} mode="contained" onPress={() => setModal("setAttributes")}>
         Set Attributes
       </Button>
       <Button style={styles.homeButton} mode="contained" onPress={() => setModal("logEvents")}>
         Log an Event
       </Button>
       <Button style={styles.homeButton} mode="contained" onPress={() => setModal("setConsent")}>
         CCPA Consent
       </Button>
       <Button style={styles.homeButton} mode="contained" onPress={testLogs}>
         Test Logs
       </Button>
     </Provider>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
   input: {
     width: '80%',
     height: 40,
     marginBottom: 15
   },
   portal:{
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     width: '90%',
     height: '90%',
     alignSelf: 'center'
   },
   modal: {
     display: 'flex',
     height: '100%',
     width: '100%',
     alignSelf: 'center'
   },
   modalView:{
     height: '90%',
     width: '90%',
     backgroundColor: 'white',
     alignSelf: 'center',
     borderRadius: 25,
     alignItems: 'center',
     justifyContent: 'center'
   },
   loginOptionsView: {
     display: 'flex', 
     flexDirection: 'row', 
     alignItems: 'center',
     marginBottom: 10
   },
   loginOptionsDialog: {
     backgroundColor: 'white', 
     height: Platform.OS === 'ios' ? '28%' : '28%', 
     width: '80%', 
     alignSelf: 'center'
   },
   loginButtonView: {
     display: 'flex', 
     flexDirection: 'row', 
     alignItems: 'center',
     marginVertical: 5
   },
   loginButtonTitle: {
     color:"#4702b0", 
     fontWeight: '600', 
     fontSize: 16
   },
   attributesModalView:{
     height: '90%',
     width: '90%',
     backgroundColor: 'white',
     alignSelf: 'center',
     borderRadius: 25,
     alignItems: 'center',
     justifyContent: 'center'
   },
   attrsOptionsDialog: {
     backgroundColor: 'white', 
     height: Platform.OS === 'ios' ? '84.5%' : '80%', 
     width: '80%', 
     alignSelf: 'center'
   },
   eventTypessDialog: {
     backgroundColor: 'white', 
     height: Platform.OS === 'ios' ? '42.5%' : '40.5%', 
     width: '80%', 
     alignSelf: 'center'
   },   
   productInput: {
     width: '80%',
     height: 50,
     marginBottom: 15
   },
   homeButton: {
     marginBottom: 20, 
     width: '70%', 
     alignSelf: 'center'
   }
 });
 
 export default App;
 