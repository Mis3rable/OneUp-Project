import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {

    },
    form: {
        height: '50%',
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.68)',
        borderRadius: 15,
    },
    logo: {
        flex: 1,
        height: 20,
        width: 230,
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 10,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        //
        borderWidth: 2,
        fontSize: 17,
    },
    button: {
        backgroundColor: '#000092',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
        //
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: 'black',
        //
    },
    footerLink: {
        color: "blue",
        fontWeight: "bold",
        fontSize: 16,
        //
        textDecorationLine: 'underline',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
})