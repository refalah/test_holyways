import React, {useContext, useState} from 'react'
import { useHistory } from "react-router-dom";
//import Input from 'reactstrap'
import { Form, FormFile } from "react-bootstrap";
import { API } from "../../../config/api";

const NewFund = () => {
    const router = useHistory();

    const [form, setForm] = useState({
        title: "",
        thumbnail: null,
        goal: "",
        description: ""
    });

    const { title, thumbnail, goal, description } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })
    };

    const handleSubmit = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }

            const formData = new FormData();
            formData.set("title", form.title);
            formData.append("imageFile", form.thumbnail[0], form.thumbnail[0].name)
            formData.set("goal", form.goal);
            formData.set("description", form.description);
           //userId

            // const config = {
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // }
            // const body = JSON.stringify({
            //     title,
            //     thumbnail,
            //     goal,
            //     description
            // });

            await API.post("/fund", formData, config);

            router.push("/raise-fund");

        } catch (error) {
            console.log(error);
        }
    }

    

    return (
        <div>
            <div className='container mt-5'>
                <div className='fund-header card-fund'>
                    <h3>Make Raise Fund</h3>
                </div>
                <div className='form-container mt-5'>
                <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                        }}>
                <Form.Group formValue={form} className='FormGroup'>
                    <Form.Control type="text" placeholder="Title" name="title" onChange={(e) => onChange(e)}/>
                    <br />
                    <Form.File id="exampleFormControlFile1" type="file" label="Upload Thumbnail" placeholder="choose" name="thumbnail" onChange={(e) => onChange(e)}/>
                    <br />
                    <Form.Control type="number" placeholder="Goals Donation" name="goal" onChange={(e) => onChange(e)}/>
                    <br />
                    <Form.Control as="textarea" type="text" placeholder="Description" rows={10} name="description" onChange={(e) => onChange(e)}/>
                    <br />
                    <div className='btn-container pb-3'>
                        <button type='submit' className='btn-fund'>Public Fundraising</button>
                    </div>
                    
                </Form.Group>
                </form>
                </div>
            </div>
        </div>
    )
}



export default NewFund