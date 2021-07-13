import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Header from '../components/Header'
import Head from 'next/head'
import Image from 'next/image'
import { getSession, useSession } from 'next-auth/client'
import Login from '../components/Login';
import { useState } from 'react'
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import { db, timestamp } from '../firebase'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import DocumentRow from '../components/DocumentRow';


export default function Home() {
  const [session] = useSession()
  
  if(!session) return <Login />
  
  const [showModal, setShowModal] = useState(false)
  const [input, setInput] = useState("")
  const [snapshot] = useCollectionOnce(db.collection('userDocs').doc(session.user.email).collection('docs').orderBy('timestamp', 'desc'))

  const createDocument = () => {
    if(!input) return;
    console.log("Creating document: " + input )
    db.collection('userDocs').doc(session.user.email).collection('docs').add({
      filename: input,
      timestamp: timestamp
    })

    setInput("");
    setShowModal(false)

  }

  const modal = (
    <Modal
      size="sm"
      active={showModal}
      toggler={() => setShowModal(false)}
    >
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of documnet..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
            color="blue"
            buttonType="link"
            ripple="dark"
            onClick={(e) => setShowModal(false)}
        >
          Cancel
        </Button>
        <Button
                color="blue"
                buttonType="link"
                ripple="light"
                onClick={createDocument}
        >
            Create
        </Button>
      </ModalFooter>
    </Modal>
  )

  return (
    <div className="">
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {modal}

      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-600 text-lg">Start a new document</h2>
            <Button
                color="gray"
                buttonType="outline"
                iconOnly={true}
                ripple="dark"
                className="border-0"
            >
                <Icon name="more_vert" size="3xl" color="gray" />
            </Button>
          </div>
          <div className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
            onClick={() => setShowModal(true)}
          >
            <Image src="https://links.papareact.com/pju" layout="fill" />
          </div>
          <p className="ml-2 mt-2 font-semibold text-sm text-gray-600">Blank</p>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Document</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>

        {snapshot?.docs.map(doc => (
          <DocumentRow
            key={doc.id}
            id={doc.id}
            filename={doc.data().filename}
            date={doc.data().timestamp}
          />
        ))}
      </section>

    </div>
  )
}

// Get server side rendering
export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
    }
  }
}