import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import NavBar from '../../components/NavBar'
import { api } from '../../services/api'
import { Colors } from '../../styles/colors'
import type { AddMeasureRequest, AddMeasureResponse } from '../../types'

type JwtPayload = {
	sub: string
}

export default function AddMeasure() {
	const [loading, setLoading] = useState(false)
	const [addMeasureValue, setAddMeasureValue] = useState<number>(0)
	const navigation = useNavigation<any>()
	const addMeasure = async () => {
		setLoading(true)
		try {
			const token = await AsyncStorage.getItem('token')
			if (!token) {
				console.warn('Token não encontrado')
				return
			}
			const decoded = jwtDecode<JwtPayload>(token)
			const email = decoded.sub
			const payload: AddMeasureRequest = {
				value: addMeasureValue,
				email,
			}

			await api.post<AddMeasureResponse>('/measures', payload, {
				headers: {
					Authorization: token ? `Bearer ${token}` : '',
				},
			})
			navigation.navigate('Home')
		} catch (error: any) {
			console.log(error?.response?.data || error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Cadastro de Glicemia</Text>

			<View style={styles.measureValueContainer}>
				<Text style={styles.measureValueText}>Valor da Glicemia</Text>
				<View style={styles.measureValueInputContainer}>
					<TextInput
						keyboardType="numeric"
						placeholder="000"
						style={styles.measureValueInput}
						maxLength={3}
						value={Number.isNaN(addMeasureValue) ? '' : String(addMeasureValue)}
						onChangeText={(text) => setAddMeasureValue(Number(text))}
					/>
					<Text style={styles.measureValueUnit}>mg/dL</Text>
				</View>
			</View>

			<View style={styles.infoStatusContainer}>
				<View style={styles.infoStatusItem}>
					<Text style={styles.infoStatusItemText}>
						Valores menores que 70 são considerados baixos. (Hipoglicemia)
					</Text>
				</View>
				<View style={styles.infoStatusItem}>
					<Text style={styles.infoStatusItemText}>
						Valores entre 70 e 180 são valores considerados normais.
					</Text>
				</View>
				<View style={styles.infoStatusItem}>
					<Text style={styles.infoStatusItemText}>
						Valores acima de 180 são considerados altos. (Hiperglicemia).
					</Text>
				</View>
			</View>

			<Pressable onPress={addMeasure} style={styles.button}>
				{loading ? (
					<ActivityIndicator color={Colors.White100} />
				) : (
					<Text style={styles.textButton}>Cadastrar Marcação</Text>
				)}
			</Pressable>
			<NavBar />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.White100,
		padding: 24,
		gap: 16,
	},

	title: {
		color: Colors.Black900,
		fontSize: 20,
		fontFamily: 'Sora_600SemiBold',
		marginTop: 32,
	},

	measureValueContainer: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: 8,
		marginTop: 8,
	},

	measureValueText: {
		color: Colors.Black900,
		fontFamily: 'Sora_600SemiBold',
		fontSize: 18,
	},

	measureValueInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},

	measureValueInput: {
		color: Colors.Black900,
		fontFamily: 'Sora_800ExtraBold',
		borderRadius: 8,
		fontSize: 64,
	},

	measureValueUnit: {
		color: Colors.Grey300,
		fontFamily: 'Sora_400Regular',
		fontSize: 24,
	},

	infoStatusContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		gap: 4,
	},

	infoStatusItem: {
		backgroundColor: Colors.White200,
		padding: 16,
		borderRadius: 8,
	},

	infoStatusItemText: {
		color: Colors.Grey300,
		fontFamily: 'Sora_400Regular',
		fontSize: 14,
	},

	button: {
		backgroundColor: Colors.Blue100,
		height: 60,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 24,
	},

	textButton: {
		color: Colors.White100,
		fontFamily: 'Sora_600SemiBold',
		fontSize: 20,
	},
})
