import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";

interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccessful : (user: User) => void,
}
const SignUpModal = ({onDismiss, onSignUpSuccessful}: SignUpModalProps) => {
    
    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await NotesApi.signUp(credentials);
            onSignUpSuccessful(newUser);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }
    
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                Sign Up
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Enter username"
                        register={register}
                        registerOptions={{ required: "Username toh chahiye bro."}}
                        error={errors.username}
                    />
                    <TextInputField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Enter email"
                        register={register}
                        registerOptions={{ required: "Bro email do tabhi hoga kuch"}}
                        error={errors.email}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        register={register}
                        registerOptions={{ required: "Password required!"}}
                        error={errors.password}
                    />
                    <Button type="submit" disabled={isSubmitting} className={styleUtils.width100}>
                        Sign up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
 
export default SignUpModal;