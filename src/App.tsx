/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	const theme = createTheme({
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: 20, // 원하는 border-radius 값으로 변경
					},
				},
			},
		},
		palette: {
			primary: {
				main: '#454645', // 원하는 primary 색상 코드로 변경
			},
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<ToastContainer position="top-center" />
			<RouterProvider router={router} />
			<ReactQueryDevtools />
		</ThemeProvider>
	)
}

export default App
