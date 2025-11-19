import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
} from 'react-native'
import { api } from '../../services/api'
import { Colors } from '../../styles/colors'
import type { SendEmailRequest, SendEmailResponse } from '../../types'

export default function ForgotPassword() {
	const navigation = useNavigation<any>()
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const handleSendEmail = async () => {
		if (!email) {
			Alert.alert('Atenção', 'Preencha o e-mail.')
			return
		}

		setLoading(true)
		try {
			const payload: SendEmailRequest = {
				email,
			}
			await api.post<SendEmailResponse>('/mail', payload)
			navigation.navigate('UpdatePassword', { email })
		} catch (error: any) {
			console.log(error?.response?.data || error)
			const message =
				error?.response?.data?.message ??
				'Não foi possível enviar o e-mail. Tente novamente.'
			Alert.alert('Erro', message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView
					contentContainerStyle={styles.container}
					keyboardShouldPersistTaps="handled"
				>
					<Image
						source={require('../../assets/Logo.png')}
						width={300}
						height={300}
					/>

					<Text style={styles.title}>
						Um pequeno passo para voltar a cuidar de você.
					</Text>

					<Text style={styles.label}>E-mail</Text>
					<TextInput
						style={styles.input}
						placeholder="Digite seu e-mail"
						placeholderTextColor={Colors.Grey300}
						autoCapitalize="none"
						keyboardType="email-address"
						value={email}
						onChangeText={setEmail}
					/>

					<Pressable style={styles.button} onPress={handleSendEmail}>
						{loading ? (
							<ActivityIndicator color={Colors.White100} />
						) : (
							<Text style={styles.textButton}>Enviar E-mail</Text>
						)}
					</Pressable>

					<Pressable
						style={styles.createAccountLinkContainer}
						onPress={() => navigation.navigate('Login')}
					>
						<Text style={styles.link}>Já possui uma conta?</Text>
					</Pressable>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
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
