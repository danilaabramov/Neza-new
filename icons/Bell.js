import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Bell = ({color}) => (
  <Svg width={25} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.252 5.3c-.694.79-1.085 1.937-1.085 3.3v1.733c0 .86-.388 1.576-.798 2.12-.376.499-.843.946-1.21 1.297l-.09.087c-.344.33-.569.777-.569 1.296 0 .526.394.867.778.867h12.444c.384 0 .778-.341.778-.867 0-.52-.225-.967-.568-1.296a55.04 55.04 0 0 0-.09-.087c-.368-.351-.835-.798-1.21-1.296-.411-.545-.799-1.26-.799-2.12V8.6c0-1.363-.391-2.51-1.085-3.3C15.071 4.528 14.025 4 12.5 4c-1.525 0-2.571.528-3.248 1.3ZM7.748 3.98C8.85 2.727 10.47 2 12.5 2c2.03 0 3.651.726 4.752 1.98 1.084 1.237 1.581 2.89 1.581 4.62v1.733c0 .244.11.538.395.917.274.363.63.703 1.022 1.08l.066.063a3.781 3.781 0 0 1 1.184 2.74C21.5 16.67 20.302 18 18.722 18H6.278C4.698 18 3.5 16.67 3.5 15.133c0-1.133.5-2.084 1.184-2.74l.066-.063c.393-.377.748-.717 1.022-1.08.285-.38.395-.673.395-.917V8.6c0-1.73.497-3.383 1.581-4.62ZM9.943 19.17a1 1 0 0 1 1.388.273c.099.148.253.288.46.392.209.103.453.162.709.162.255 0 .5-.059.708-.162.208-.104.362-.244.461-.392a1 1 0 0 1 1.662 1.114 3.184 3.184 0 0 1-1.231 1.068 3.595 3.595 0 0 1-1.6.372 3.596 3.596 0 0 1-1.6-.372 3.184 3.184 0 0 1-1.23-1.068 1 1 0 0 1 .273-1.387Z"
      fill={color}
    />
  </Svg>
)

export default Bell
