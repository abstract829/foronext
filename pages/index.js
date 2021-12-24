import Head from 'next/head'
import ForumCard from '../components/ForumCard/ForumCard'
import ForumMenu from '../components/ForumMenu/ForumMenu'
import SharedLayout from '../components/SharedLayout/SharedLayout'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SharedLayout>
        <ForumMenu/>
        <div className='mx-4 mt-4'>
          <ForumCard/>
        </div>
      </SharedLayout>

      
    </div>
  )
}
