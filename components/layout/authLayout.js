export default function authLayout({ children }) {
  return (
    <>
      <main>
        <div className=" flex xl:w-9/12 mx-auto mt-10">
          {children}
        </div>
      </main>
    </>
  )
}