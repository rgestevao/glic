import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { Colors } from '../../styles/colors'

export default function Login() {
	const navigation = useNavigation<any>()
	const [showPassword, setShowPassword] = useState(false)

	return (
		<View style={styles.container}>
			<Image
				source={require('../../assets/Logo.png')}
				width={300}
				height={300}
			/>

			<Text style={styles.title}>Seu bem-estar começa aqui.</Text>

			<Text style={styles.label}>E-mail</Text>
			<TextInput
				style={styles.input}
				placeholder="Digite seu e-mail"
				placeholderTextColor={Colors.Grey300}
			/>

			<Text style={styles.label}>Senha</Text>
			<View>
				<TextInput
					style={styles.input}
					placeholder="Digite sua senha"
					secureTextEntry={!showPassword}
					placeholderTextColor={Colors.Grey300}
				/>

				<Pressable
					style={styles.icon}
					onPress={() => setShowPassword(!showPassword)}
				>
					<Feather
						name={showPassword ? 'eye' : 'eye-off'}
						size={24}
						color={Colors.Black900}
					/>
				</Pressable>
			</View>

			<Pressable
				style={styles.forgotPasswordLinkContainer}
				onPress={() => navigation.navigate('Home')}
			>
				<Text style={styles.link}>Esqueceu sua senha?</Text>
			</Pressable>

			<Pressable style={styles.button}>
				<Text style={styles.textButton}>Entrar</Text>
			</Pressable>

			<Pressable
				style={styles.createAccountLinkContainer}
				onPress={() => navigation.navigate('Home')}
			>
				<Text style={styles.link}>Não possui uma conta?</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.White100,
		justifyContent: 'center',
		paddingHorizontal: 24,
		gap: 16,
	},

	title: {
		color: Colors.Black900,
		fontSize: 20,
		fontFamily: 'Sora_600SemiBold',
	},

	label: {
		color: Colors.Black900,
		fontSize: 16,
		fontFamily: 'Sora_400Regular',
	},

	input: {
		backgroundColor: Colors.White200,
		borderRadius: 8,
		height: 60,
		paddingHorizontal: 16,
		paddingVertical: 4,
		fontSize: 16,
		fontFamily: 'Sora_400Regular',
	},

	icon: {
		position: 'absolute',
		right: 16,
		top: 18,
	},

	link: {
		color: Colors.Black900,
		fontSize: 14,
		fontFamily: 'Sora_400Regular',
		textDecorationLine: 'underline',
	},

	forgotPasswordLinkContainer: {
		alignItems: 'flex-end',
	},

	createAccountLinkContainer: {
		alignItems: 'center',
	},

	button: {
		backgroundColor: Colors.Blue100,
		height: 60,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},

	textButton: {
		color: Colors.White100,
		fontSize: 20,
		fontFamily: 'Sora_600SemiBold',
	},
})
