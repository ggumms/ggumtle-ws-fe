import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={client}>
		<App />
		{/* <React.StrictMode>
	</React.StrictMode> */}
	</QueryClientProvider>
)

// 작성한 sw.js 등록
// 브라우저가 서비스 워커를 지원하는지 확인하고, 지원한다면 sw.js를 등록한다.
console.log('service worker script 실행 중')
if ('serviceWorker' in navigator) {
	//  페이지가 완전히 로드된 후에 서비스 워커를 등록
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('/sw.js').then(
			function (registration) {
				console.log('ServiceWorker registration successful with scope: ', registration.scope)
			},
			function (err) {
				console.log('ServiceWorker registration failed: ', err)
			}
		)
	})
}
