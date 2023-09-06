export default async function App({ params }: { params: { app: string } }) {
  return <div>{params.app}</div>
}
