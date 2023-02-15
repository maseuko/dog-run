interface RegistrationInterface {
    name: string,
    surname: string,
    email: string,
    password: string,
    'repeat-password'?: string
}

export default RegistrationInterface;