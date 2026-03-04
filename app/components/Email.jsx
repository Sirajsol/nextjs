"use client"
import{HTML,
    Body,
 Section,
 

} from '@react-email/components';
import { Img } from "@react-email/img";
import {Tailwind} from '@react-email/tailwind'
const Email = ({title,name,message,imgsr,lnk}) => {
    return <div>
        <HTML>
            <Tailwind>
            <Body>
                
            <Img src={imgsr} alt="img" width="300" height="300" />
            <Section> {title} {name}</Section>
<br></br>
<Section> {title} {name}</Section>


<br>
</br>
<Section>{message}</Section>
<br />
<a href={lnk}>تأكيد</a>
            </Body>
            </Tailwind>
        </HTML>
    </div>
}
 
export default Email;