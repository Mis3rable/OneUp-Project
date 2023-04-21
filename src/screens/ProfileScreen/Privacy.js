import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const PrivacyModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.modalBtn} onPress={() => setModalVisible(true)}>
      <Ionicons name="people-outline" size={20} color="chocolate" style={styles.icon} />
        <Text style={styles.modalTxt}>Privacy Policy</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
        <ScrollView>
          <Text style={styles.modalTitle}>Privacy Policy</Text>
          <Text style={styles.modalText}>
          {"\n\n"}
          <Text style={{fontWeight: "bold"}}>GENERAL</Text>
          {"\n\n"}
          We respects the privacy of its users (“user” or “you”) that use our ONE UP! application located in apple and google play stores. 
          The following “Privacy Policy” is designed to inform you, as a user of the App, about the types of information that Company may gather 
          about or collect from you in connection with your use of the App. It also is intended to explain the conditions under which Company 
          uses and discloses that information, and your rights in relation to that information. Changes to this Privacy Policy are discussed at the 
          end of this document. Each time you use the App, however, the current version of this Privacy Policy will apply. 
          Accordingly, each time you use the App you should check the date of this Privacy Policy (which appears at the beginning of this document) 
          and review any changes since the last time you used the App.
          The App is hosted in the Republic of the Philippines and is subject to P.H. state and federal law. 
          If you are accessing our App from other jurisdictions, please be advised that you are transferring your personal information to us in the 
          Philippines, and by using our App, you consent to that transfer and use of your personal information in accordance with this Privacy Policy.
           You also agree to abide by the applicable laws of applicable states and P.H. federal law concerning your use of the 
           App and your agreements with us. Any persons accessing our App from any jurisdiction with laws or regulations governing the use of the 
           Internet, including personal data collection, use and disclosure, different from those of the jurisdictions mentioned above may only use 
           the App in a manner lawful in their jurisdiction. If your use of the App would be unlawful in your jurisdiction, please do not use the App.
          BY USING OR ACCESSING THE APP, YOU ARE ACCEPTING THE PRACTICES DESCRIBED IN THIS PRIVACY POLICY.
          GATHERING, USE AND DISCLOSURE OF NON-PERSONALLY-IDENTIFYING INFORMATION
          {"\n\n"}
          <Text style={{fontWeight: "bold"}}>Users of the App Generally</Text>
          {"\n\n"}
          “Non-Personally-Identifying Information” is information that, without the aid of additional information, cannot be directly associated with a specific person. “Personally-Identifying Information,” 
          by contrast, is information such as a name or email address that, without more, can be directly associated with a specific person. 
          Like most App operators, Company gathers from users of the App Non-Personally-Identifying Information of the sort that Web browsers, 
          depending on their settings, may make available. That information includes the user’s Internet Protocol (IP) address, operating system, 
          browser type and the locations of the Apps the user views right before arriving at, while navigating and immediately after leaving the App. 
          Although such information is not Personally-Identifying Information, it may be possible for Company to determine from an IP address a user’s 
          Internet service provider and the geographic location of the visitor’s point of connectivity as well as other statistical usage data. 
          Company analyzes Non-Personally-Identifying Information gathered from users of the App to help Company better understand how the App is being used. 
          By identifying patterns and trends in usage, Company is able to better design the App to improve users’ experiences, 
          both in terms of content and ease of use. From time to time, Company may also release the Non-Personally-Identifying Information gathered from 
          App users in the aggregate, such as by publishing a report on trends in the usage of the App.
          Analytics
          {"\n\n"}
          We may use third-party vendors, including Google, who use first-party cookies (such as the Google Analytics cookie) and third-party cookies 
          (such as the DoubleClick cookie) together to inform, optimize and serve ads based on your past activity on the App, including Google Analytics for Display Advertising. The information collected may be used to, among other things, analyze and track data, determine the popularity of certain content and better understand online activity. If you do not want any information to be collected and used by Google Analytics, you can install an opt-out in your web browser (https://tools.google.com/dlpage/gaoptout/) and/or opt out from Google Analytics for Display Advertising or the Google Display Network by using Google’s Ads Settings (www.google.com/settings/ads).
          
          {"\n\n"}
          <Text style={{fontWeight: "bold"}}>Mobile Device Additional Terms</Text>
          {"\n\n"}
          •  Mobile Device. If you use a mobile device to access the App or download any of our applications, we may collect device information (such as your mobile device ID, model and manufacturer), operating system, version information and IP address.
          {"\n\n"}
          •  Geo-Location Information. Unless we have received your prior consent, we do not access or track any location-based information from your mobile device at any time while downloading or using our mobile application or our services, except that it may be possible for Company to determine from an IP address the geographic location of your point of connectivity, in which case we may gather and use such general location data.
          {"\n\n"}
          •   Push Notifications. We send you push notifications if you choose to receive them, letting you know when someone has sent you a message or for other service-related matters. If you wish to opt-out from receiving these types of communications, you may turn them off in your device’s settings.
          {"\n\n"}
          •  Mobile Analytics. We use mobile analytics software to allow us to better understand the functionality of our mobile software on your phone. This software may record information, such as how often you use the application, the events that occur within the application, aggregated usage, performance data and where the application was downloaded from. We do not link the information we store within the analytics software to any Personally-Identifying Information you submit within the mobile application.
          {"\n\n"}
          <Text style={{fontWeight: "bold"}}>SECURITY</Text>
          {"\n\n"}
          We take the security of your Personally-Identifying Information seriously and use reasonable electronic, personnel and physical measures to protect it from loss, theft, alteration or misuse.  However, please be advised that even the best security measures cannot fully eliminate all risks. We cannot guarantee that only authorized persons will view your information. We are not responsible for third-party circumvention of any privacy settings or security measures.
          We are dedicated to protect all information on the App as is necessary. However, you are responsible for maintaining the confidentiality of your Personally-Identifying Information by keeping your password confidential. You should change your password immediately if you believe someone has gained unauthorized access to it or your account. If you lose control of your account, you should notify us immediately.
          {"\n\n"}
          <Text style={{fontWeight: "bold"}}>PRIVACY POLICY CHANGES</Text>
          {"\n\n"}
          Company may, in its sole discretion, change this Privacy Policy from time to time. Any and all changes to Company’s Privacy Policy will be reflected on this page and the date new versions are posted will be stated at the top of this Privacy Policy. Unless stated otherwise, our current Privacy Policy applies to all information that we have about you and your account. Users should regularly check this page for any changes to this Privacy Policy. Company will always post new versions of the Privacy Policy on the App. However, Company may, as determined in its discretion, decide to notify users of changes made to this Privacy Policy via email or otherwise. Accordingly, it is important that users always maintain and update their contact information.
          {"\n\n"}
          <Text style={{fontWeight: "bold"}}>
          CONTACT
          {"\n\n"}
          If you have any questions regarding our Privacy Policy, please contact our Privacy Officer at:
          {"\n\n"}
          <Text style={{fontStyle: "italic", color: "peru"}}> Contact Info To Be Updated </Text>
            </Text>
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBtn: {
    backgroundColor: '#FFFFFF', 
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'peru',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 17,
  },
  modalTxt: {
    color: 'black',
    fontWeight: 'bold',
    width: 100,
    height: 20,
    textAlign: 'left',
    marginLeft: 10,
    fontSize: 15,
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'seashell'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    color: 'saddlebrown'
  },
  modalText: {
    fontSize: 18,
    margin: 20,
    marginTop: 1
  },
  modalButton: {
    backgroundColor: 'snow',
    padding: 12,
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 30,
  },
  modalButtonText: {
    fontSize: 18,
    color: 'peru',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
});

export default PrivacyModal;