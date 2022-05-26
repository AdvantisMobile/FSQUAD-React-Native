import {StyleSheet} from "react-native";
import {colors} from '../../../utils/theme';

const styles = StyleSheet.create({
    commentRow: {
        lineHeight: 20,
        fontSize: 14,
        color: colors.white,
    },
    author: {
        fontWeight: 'bold',
        color: '#F1B828'
    },
    flexStartAligned: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarStyle: {
        position: 'absolute',
        top: 0,
        width: 30,
        height: 30,
        alignSelf: 'center',
        borderRadius: 15,
    },
    cardStatsCounter: {
        flexDirection: 'row',
        marginLeft: 40,
        marginTop: 5
    },
    hour: {
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.dark_gray,
    },
    likes: {
        fontSize: 13,
        marginLeft: 10,
        fontWeight: 'bold',
        color: colors.dark_gray
    },
    commentCounter: {
        fontSize: 13,
        marginLeft: 10,
        fontWeight: 'bold',
        color: colors.dark_gray
    },
    replyContainer: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 30,
        flexDirection: 'row'
    }
});

export default styles;
