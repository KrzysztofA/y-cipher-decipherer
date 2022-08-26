import React, { useState, useEffect } from "react";

import styles from "./OutputWindow.module.css"

export default function OutputWindow() {
    const [outputState, setOutputState] = React.useState('');

    useEffect(() => {

    }, [outputState]);

    return (<>
        <div className={styles.window}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consequat et augue at ultrices. Curabitur vel suscipit diam. Vestibulum sodales felis nec sapien mollis, non volutpat ex bibendum. Pellentesque dignissim dolor nunc, id vehicula tortor ultrices ac. Nulla a tincidunt nisl, quis varius nulla. Sed pulvinar ornare sem, ut accumsan libero cursus eget. Aliquam ac blandit purus. Phasellus feugiat dictum quam, et sodales risus facilisis id. Maecenas convallis nunc a felis vulputate, gravida consequat nisl accumsan. In nec vulputate quam. Sed purus ipsum, mattis at velit id, pretium eleifend neque. Nulla mattis dignissim laoreet. Praesent sit amet massa non orci mattis tempor sed non massa. Vivamus eget leo eros. Etiam eget tortor molestie, dapibus tortor vel, vehicula massa.

Pellentesque vitae felis non magna tempus tincidunt. Pellentesque ultrices nunc vitae accumsan tincidunt. Morbi scelerisque quam urna, at dictum lacus pharetra in. Nulla turpis eros, consequat hendrerit interdum a, volutpat pulvinar augue. Etiam semper nunc iaculis bibendum ultricies. Curabitur auctor dignissim orci, ut facilisis dolor mollis sit amet. Nam rhoncus fermentum quam, vel pretium nibh tincidunt eget. Aliquam sodales ex enim, ac mattis mi malesuada in.

Sed malesuada tellus orci, a tristique nisi tincidunt et. Nulla fermentum vehicula risus, vel viverra nisl volutpat in. In sodales convallis enim a aliquet. Vestibulum gravida iaculis elit, sit amet rutrum ex rhoncus eget. Quisque imperdiet id sem quis vulputate. Duis ornare iaculis ex et ultricies. Donec metus urna, vulputate a leo ac, vehicula venenatis leo. Ut dictum, lorem mollis feugiat lobortis, urna libero varius dui, commodo molestie nunc tortor semper ipsum. In commodo scelerisque augue et mattis. In vitae efficitur odio, eget blandit massa. Cras a arcu at orci ultrices porttitor sagittis a felis. Etiam ac tempus massa. Maecenas volutpat leo vel ornare pharetra.

Nullam non feugiat elit. Suspendisse nec laoreet metus, vitae semper neque. Aliquam erat volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse sed mi ac ex sodales auctor. Pellentesque tincidunt erat suscipit, lobortis nisl quis, dignissim nisi. Proin a urna orci. Nullam non dapibus lorem. Vivamus eu hendrerit magna, sed blandit tortor. Ut in lorem purus. Fusce massa neque, interdum sed velit vitae, hendrerit tempor quam. Nunc vestibulum, mi a iaculis pulvinar, massa risus consectetur risus, eget efficitur lorem est at lectus. Vestibulum laoreet lobortis ornare.

Phasellus ac ornare lacus. Cras commodo mauris in tortor viverra aliquam. Integer eget sem elit. Morbi in varius nunc. In quis placerat eros. Sed interdum, leo eu gravida dignissim, quam sapien tempor sem, non egestas lacus ante vel ipsum. Sed id mauris risus. Suspendisse at ullamcorper leo. Fusce dapibus laoreet pharetra. Pellentesque leo ex, pretium in lacinia quis, sollicitudin at elit.
        </div>
        </>
    )
}