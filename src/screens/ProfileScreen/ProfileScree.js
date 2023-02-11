import { View } from "react-native";
import AboutUsModal from "./AboutUs";
import PrivacyModal from "./Privacy";
import TermsModal from "./Terms";

export default function ProfileScreen ({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ marginBottom: 20 }}>
            <AboutUsModal />
        </View>
        <View style={{ marginBottom: 20 }}>
        <PrivacyModal/>
        </View>
        <View style={{ marginBottom: 20 }}>
        <TermsModal/>
        </View>
        </View>
      );
}
