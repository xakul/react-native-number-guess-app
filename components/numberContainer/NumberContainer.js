import styles from "./NumberContainerStyle";
import { View, Text } from 'react-native';


export default function NumberContainer({ children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {children}
            </Text>
        </View>
    )
}