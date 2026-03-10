import { useState } from "react";
import { Pencil, Plus, Trash2, Heart, Star } from "lucide-react";
import "../css/products.css";

function Products() {

const [search,setSearch] = useState("")
const [wishlist,setWishlist] = useState([])

const [products,setProducts] = useState([

{
id:1,
name:"Rose Glow Serum",
price:799,
rating:5,
image:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273"
},
{
id:2,
name:"SugarPetal Lip Balm",
price:299,
rating:4,
image:"https://images.unsplash.com/photo-1586495777744-4413f21062fa"
},
{
id:3,
name:"Hydrating Face Cream",
price:599,
rating:5,
image:"https://images.unsplash.com/photo-1556228720-195a672e8a03"
},
{
id:4,
name:"Natural Face Wash",
price:399,
rating:4,
image:"https://images.unsplash.com/photo-1601049676869-702ea24cfd58"
},
{
id:5,
name:"Vitamin C Serum",
price:899,
rating:5,
image:"https://images.unsplash.com/photo-1571781926291-c477ebfd024b"
},
{
id:6,
name:"Glow Night Cream",
price:699,
rating:4,
image:"https://images.unsplash.com/photo-1612817288484-6f916006741a"
},
{
id:7,
name:"Aloe Vera Gel",
price:249,
rating:4,
image:"https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd"
},
{
id:8,
name:"Organic Body Lotion",
price:549,
rating:5,
image:"https://images.unsplash.com/photo-1596464716127-f2a82984de30"
},
{
id:9,
name:"Rose Water Toner",
price:349,
rating:4,
image:"https://images.unsplash.com/photo-1601049676869-702ea24cfd58"
},
{
id:10,
name:"SugarPetal Sunscreen",
price:499,
rating:5,
image:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad"
}

])

const imageLibrary = [

"https://images.unsplash.com/photo-1596755389378-c31d21fd1273",
"https://images.unsplash.com/photo-1586495777744-4413f21062fa",
"https://images.unsplash.com/photo-1556228720-195a672e8a03",
"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
"https://images.unsplash.com/photo-1571781926291-c477ebfd024b"

]

const [editing,setEditing] = useState(null)

/* SEARCH */

const filteredProducts = products.filter(p =>
p.name.toLowerCase().includes(search.toLowerCase())
)

/* EDIT PRODUCT */

const handleEdit = (product)=>{
setEditing({...product})
}

/* SAVE PRODUCT */

const saveProduct = ()=>{

setProducts(products.map(p =>
p.id === editing.id ? editing : p
))

setEditing(null)

}

/* ADD PRODUCT */

const addProduct = ()=>{

const newProduct = {
id:Date.now(),
name:"New Product",
price:0,
rating:5,
image:imageLibrary[0]
}

setProducts([...products,newProduct])

}

/* REMOVE PRODUCT */

const removeProduct = (id)=>{
setProducts(products.filter(p => p.id !== id))
}

/* WISHLIST */

const addWishlist = (product)=>{
setWishlist([...wishlist,product])
}

return (

<div className="products-page">

<div className="product-header">

<h2 className="products-title">🌸 SugarPetal Product Manager</h2>

<button className="add-product-btn" onClick={addProduct}>
<Plus size={16}/> Add Product
</button>

</div>

{/* SEARCH */}

<div className="search-product">

<input
type="text"
placeholder="Search products..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

{/* PRODUCTS GRID */}

<div className="products-grid">

{filteredProducts.map((product)=>(

<div className="product-card" key={product.id}>

<div className="wishlist" onClick={()=>addWishlist(product)}>
<Heart size={16}/>
</div>

<img src={product.image} alt={product.name}/>

<h3>{product.name}</h3>

<div className="rating">

{Array(product.rating).fill().map((_,i)=>(
<Star key={i} size={16} fill="gold"/>
))}

</div>

<p className="price">₹{product.price}</p>

<div className="card-buttons">

<button className="edit-btn" onClick={()=>handleEdit(product)}>
<Pencil size={16}/> Edit
</button>

<button
className="delete-btn"
onClick={()=>removeProduct(product.id)}
>
<Trash2 size={16}/> Remove
</button>

</div>

</div>

))}

</div>

{/* EDIT MODAL */}

{editing && (

<div className="edit-modal">

<h3>Edit Product</h3>

<label>Name</label>

<input
value={editing.name}
onChange={(e)=>setEditing({...editing,name:e.target.value})}
/>

<label>Price</label>

<input
type="number"
value={editing.price}
onChange={(e)=>setEditing({...editing,price:e.target.value})}
/>

<label>Choose Image</label>

<div className="image-library">

{imageLibrary.map((img,i)=>(

<img
key={i}
src={img}
onClick={()=>setEditing({...editing,image:img})}
/>

))}

</div>

<button className="save-btn" onClick={saveProduct}>
Save Changes
</button>

</div>

)}

</div>

)

}

export default Products