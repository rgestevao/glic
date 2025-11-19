import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
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
	View,
} from 'react-native'
import { api } from '../../services/api'
import { Colors } from '../../styles/colors'
import type { UpdatePasswordRequest, UpdatePasswordResponse } from '../../types'

export default function UpdatePassword() {
	const navigation = useNavigation<any>()
	const route = useRoute<any>()
	const receivedEmail: string = route.params?.email ?? ''
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const canSubmit =
		password.length > 0 &&
		confirmPassword.length > 0 &&
		password === confirmPassword
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const handleRegister = async () => {
		if (!password || !confirmPassword) {
			Alert.alert('Atenção', 'Preencha a senha e a confirmação de senha.')
			return
		}

		if (password !== confirmPassword) {
			Alert.alert('Atenção', 'As senhas não coincidem.')
			return
		}

		setLoading(true)

		try {
			const payload: UpdatePasswordRequest = {
				password: password,
				email: receivedEmail,
			}

			await api.put<UpdatePasswordResponse>('/users', payload)
		} catch (error: any) {
			console.log(error?.response?.data || error)
			const message =
				error?.response?.data?.message ??
				'Não foi possível realizar o cadastro. Tente novamente.'
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
						Mais controle, mais liberdade. Comece agora.
					</Text>

					<Text style={styles.label}>Senha</Text>
					<View>
						<TextInput
							style={styles.input}
							placeholder="Digite sua senha"
							secureTextEntry={!showPassword}
							placeholderTextColor={Colors.Grey300}
							value={password}
							onChangeText={setPassword}
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

					<Text style={styles.label}>Confirmar senha</Text>
					<View>
						<TextInput
							style={styles.input}
							placeholder="Digite sua senha"
							secureTextEntry={!showConfirmPassword}
							placeholderTextColor={Colors.Grey300}
							value={confirmPassword}
							onChangeText={setConfirmPassword}
						/>

						<Pressable
							style={styles.icon}
							onPress={() => setShowConfirmPassword(!showConfirmPassword)}
						>
							<Feather
								name={showConfirmPassword ? 'eye' : 'eye-off'}
								size={24}
								color={Colors.Black900}
							/>
						</Pressable>
					</View>

					<Pressable
						style={[
							styles.button,
							(!canSubmit || loading) && styles.buttonDisabled,
						]}
						onPress={handleRegister}
						disabled={!canSubmit || loading}
					>
						{loading ? (
							<ActivityIndicator color={Colors.White100} />
						) : (
							<Text style={styles.textButton}>Atualizar Senha</Text>
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

	buttonDisabled: {
		backgroundColor: Colors.Grey300,
	},

	textButton: {
		color: Colors.White100,
		fontSize: 20,
		fontFamily: 'Sora_600SemiBold',
	},
})
