import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Landing from './pages/landing/Landing';
import NotFound from "./pages/error/NotFound";
import MyPage from "./pages/mypage/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />
  },
  {
    path: "/onboarding",
    element: <div>Implement Chat UI here!</div>,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  }
]);

const App = () => {
  return (
    <div className='md:w-[640px] h-dvh container mx-auto'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
