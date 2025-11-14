import LoginGoogleButton from '@/components/LoginGoogleButton'
import { Ionicons } from '@expo/vector-icons'
import { Label } from '@react-navigation/elements'
import * as Google from 'expo-auth-session/providers/google'
import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { Colors } from '../../styles/colors'

const Logo = require('../../assets/Logotype.png')

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false)

	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId:
			'633254532634-ln6viclkgnch7jpgb05171ohch6av3ml.apps.googleusercontent.com',
	})

	useEffect(() => {
		if (response?.type === 'success') {
			const { authentication } = response
			console.log('Token do Google:', authentication?.accessToken)
		}
	}, [response])

	return (
		<View style={styles.container}>
			{/* Logo + título */}
			<Image source={Logo} style={styles.logo} resizeMode="contain" />

			<Text style={styles.subtitle}>Seu bem-estar começa aqui.</Text>

			{/* Formulário */}
			<View style={styles.form}>
				<Label style={styles.label}>E-mail</Label>
				<TextInput
					placeholder="Digite seu e-mail"
					placeholderTextColor="#C4C4C4"
					style={styles.input}
				/>

				{/* <Label style={[styles.label, styles.labelPassword]}>Senha</Label>
				<TextInput
					placeholder="Digite sua senha"
					placeholderTextColor="#C4C4C4"
					secureTextEntry
					style={styles.input}
				/> */}

				<View style={styles.passwordContainer}>
					<TextInput
						placeholder="Digite sua senha"
						style={[styles.input, styles.passwordInput]}
						placeholderTextColor="#999"
						secureTextEntry={!showPassword}
					/>

					<TouchableOpacity
						onPress={() => setShowPassword(!showPassword)}
						style={styles.eyeButton}
					>
						<Ionicons
							name={showPassword ? 'eye' : 'eye-off'}
							size={22}
							color="#777"
						/>
					</TouchableOpacity>
				</View>

				<Link href="/" style={styles.forgotPassword}>
					Esqueceu sua senha?
				</Link>

				{/* Botão primário */}
				<TouchableOpacity style={styles.primaryButton} onPress={() => {}}>
					<Text style={styles.primaryButtonText}>Entrar</Text>
				</TouchableOpacity>

				<LoginGoogleButton onPress={() => promptAsync()} />

				{/* <TouchableOpacity style={styles.googleButton} onPress={() => {}}>
					<Text style={styles.googleButtonText}>Entrar com o Google</Text>
				</TouchableOpacity> */}
			</View>

			{/* Link inferior */}
			<Link href="/" style={styles.bottomLink}>
				Não possui uma conta?
			</Link>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white100,
		paddingHorizontal: 24,
		paddingTop: 72,
	},

	logo: {
		width: 120,
		height: 40,
		marginBottom: 24,
	},

	subtitle: {
		fontSize: 22,
		fontWeight: '700',
		marginBottom: 32,
		color: Colors.black900,
	},

	form: {
		flexGrow: 1,
	},

	label: {
		fontSize: 14,
		fontWeight: '500',
		color: Colors.black900,
		marginBottom: 8,
		textAlign: 'left',
	},

	labelPassword: {
		marginTop: 16,
	},

	input: {
		height: 52,
		borderRadius: 12,
		paddingHorizontal: 16,
		backgroundColor: Colors.white200,
		marginBottom: 4,
	},

	forgotPassword: {
		marginTop: 8,
		marginBottom: 24,
		alignSelf: 'flex-end',
		fontSize: 13,
		textDecorationLine: 'underline',
		color: Colors.black900,
	},

	primaryButton: {
		height: 52,
		borderRadius: 16,
		backgroundColor: Colors.blue100,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
	},

	primaryButtonText: {
		color: '#FFF',
		fontWeight: '600',
		fontSize: 16,
	},

	googleButton: {
		height: 52,
		borderRadius: 16,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#E5E5E5',
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
	},

	googleButtonText: {
		color: '#555',
		fontWeight: '500',
		fontSize: 15,
	},

	bottomLink: {
		textAlign: 'center',
		fontSize: 13,
		textDecorationLine: 'underline',
		marginBottom: 24,
		color: Colors.black900,
	},

	passwordContainer: {
		position: 'relative',
		justifyContent: 'center',
	},

	passwordInput: {
		paddingRight: 45, // espaço pro ícone
	},

	eyeButton: {
		position: 'absolute',
		right: 12,
		height: '100%',
		justifyContent: 'center',
	},
})
