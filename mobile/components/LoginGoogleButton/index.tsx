import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { WebView } from 'react-native-webview'

type Props = {
	onPress: (credential?: string) => void
	clientId?: string
}

export default function LoginGoogleButton({ onPress, clientId }: Props) {
	const webClientId = clientId ?? 'SEU_WEB_CLIENT_ID'

	// Se não houver clientId configurado, mostrar um botão fallback
	if (!webClientId || webClientId.includes('SEU')) {
		return (
			<TouchableOpacity style={styles.googleButton} onPress={() => onPress()}>
				<View style={styles.googleContent}>
					<Svg
						width={18}
						height={18}
						viewBox="0 0 48 48"
						style={styles.googleIcon}
					>
						<Path
							fill="#EA4335"
							d="M9 20.5A19 19 0 0 1 24 5c5.1 0 9.7 2 13.2 5.3L32.1 17C30.2 15.3 27.3 14 24 14 18.9 14 14.4 16.9 11.9 21.1z"
						/>
						<Path
							fill="#FBBC05"
							d="M24 44c4.3 0 8.2-1.6 11.2-4.2l-6.3-4.8C27.8 35.6 26 36 24 36c-3.2 0-6-1.3-8.2-3.4L9.6 36.8C12.4 40.6 17.8 44 24 44z"
						/>
						<Path
							fill="#34A853"
							d="M43 24.5c0-1.6-.1-3.1-.4-4.6H24v8.7h11.8c-.5 2.7-2 5-4.2 6.6L36 38c4.4-3 7-7.9 7-13.5z"
						/>
						<Path
							fill="#4285F4"
							d="M9.6 11.2l6.9 5C17.8 14.7 20.7 13 24 13c3.1 0 6 1.3 8 3.4l6.1-6.2C33.9 6 29.2 4 24 4 17.8 4 12.4 7.4 9.6 11.2z"
						/>
					</Svg>
					<Text style={styles.googleButtonText}>Entrar com o Google</Text>
				</View>
			</TouchableOpacity>
		)
	}

	return (
		<WebView
			style={{ height: 50, width: 280, backgroundColor: 'transparent' }}
			originWhitelist={['*']}
			javaScriptEnabled
			domStorageEnabled
			scrollEnabled={false}
			source={{
				html: `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
              <script src="https://accounts.google.com/gsi/client" async></script>
            </head>
            <body style="margin:0; display:flex; justify-content:center; align-items:center;">
              
              <div id="g_id_onload"
                data-client_id="${webClientId}"
                data-callback="handleGoogle"
                data-auto_prompt="false">
              </div>

              <div class="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left">
              </div>

              <script>
                function handleGoogle(response) {
                  window.ReactNativeWebView.postMessage(response.credential);
                }
              </script>

            </body>
          </html>
        `,
			}}
			onMessage={(event) => {
				const credential = event.nativeEvent.data
				onPress(credential)
			}}
		/>
	)
}

const styles = StyleSheet.create({
	googleButton: {
		height: 52,
		borderRadius: 16,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#E5E5E5',
	},
	googleButtonText: {
		color: '#555',
		fontWeight: '500',
		fontSize: 15,
	},
	googleContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	googleIcon: {
		marginRight: 10,
	},
})
