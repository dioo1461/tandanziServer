import bcrypt from 'bcrypt';

const rounds = 10;

export const EncryptPassword = async(password: string): Promise<string> => {
    return await bcrypt.hash(password, rounds);
}

export const DecryptPassword = async(crypted: string): Promise<any> => {
    

}

export const ComparePassword = async(cryptedOrigin:string, password:string):Promise<boolean> => {
    return await bcrypt.compare(cryptedOrigin, password);
}