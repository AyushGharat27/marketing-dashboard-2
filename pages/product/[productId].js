import Image from "next/image";
import { useRouter } from "next/router";

export async function getServerSideProps() {
    const res = await fetch('https://json.extendsclass.com/bin/6bc3609d8d9d');
    const data = await res.json();
    // obtains data to be returned as a prop. 
    // TODO: Currently is fetching all json data, but this should be optimised to retrieve only data which matches the productId
    return {
        props: {
            toDo: data
        }
    }
}

function ProductDetails({ toDo }) {
    //obtaining url information
    const router = useRouter();
    const productId = router.query.productId;

    // finding the relevant object containing marketing data
    const objectData = toDo.find(toDo => toDo.id.toString() === productId);

    return (
        <div className="product-details">
            {objectData === void 0 ?
                ( 
                    <h1>Error 404... Page not found</h1>
                ) :
                (
                    <div key={objectData.id}>
                        <h1>{objectData.title}</h1>
                        <h2>
                            {objectData.subtitle}
                        </h2>
                        <h3>Offer Price</h3>
                        <h1>₹{objectData.discountedprice}</h1>
                        {/* <Image
                            alt="The guitarist in the concert."
                            src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
                            width={225}
                            height={130}
                            layout="responsive"
                        /> */}
                    </div>
                )}
        </div>
    )
}



export default ProductDetails