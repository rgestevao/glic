import {
	Sora_400Regular,
	Sora_600SemiBold,
	Sora_700Bold,
	useFonts,
} from '@expo-google-fonts/sora'
import AppRoutes from './src/navigation/AppRoutes'

export default function App() {
	const [fontsLoaded] = useFonts({
		Sora_400Regular,
		Sora_600SemiBold,
		Sora_700Bold,
	})

	if (!fontsLoaded) {
		return null
	}

	return <AppRoutes />
}
