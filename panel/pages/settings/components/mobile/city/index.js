import {useController, useForm} from "react-hook-form";
import {Grid} from "@admin/Grid";
import Input from "@admin/Input";
import {useContext} from "react";
import {TranslationContext} from "~/app/Context";


export default function City({control, name, data}) {
    const {field: {value}} = useController({control, name})

    const {control: control2, watch, getValues} = useForm({
        defaultValues: {
            city: value,
            state: data.all_cities.find(item => value === item.id)?.state_id
        }
    })


    return (
        <>
            <Grid size={6}>
                <Input
                    control={control2}
                    name="state"
                    type="select-searchable"
                    data={data.all_states}
                />
            </Grid>
            <Grid size={6}>
                {(watch("state") || true) && (
                    <Input name={name}
                           control={control} type="select-searchable"
                           data={data.all_cities.filter(item => item.state_id === getValues("state"))}
                    />
                )}

            </Grid>
        </>
    )
}