import sys
import cv2
from pyzbar.pyzbar import decode

# Función para capturar y decodificar un código QR
def read_qr_code():
    cap = cv2.VideoCapture(0)  # Abrir la cámara predeterminada (puede que necesites ajustar el índice)
    qr_detected = False  # Variable para controlar la detección

    while not qr_detected:
        ret, frame = cap.read()
        if not ret:
            continue

        # Decodificar códigos QR en el fotograma
        decoded_objects = decode(frame)

        for obj in decoded_objects:
            data = obj.data.decode('utf-8')
            print(f"Código QR encontrado: {data}")
            qr_detected = True  # Detener la detección

        # Mostrar la imagen con los códigos QR resaltados
        for obj in decoded_objects:
            points = obj.polygon
            if len(points) > 4:
                hull = cv2.convexHull(np.array([point for point in points], dtype=np.float32))
                cv2.polylines(frame, [hull], True, (0, 255, 0), 2)

        cv2.imshow("QR Code Scanner", frame)

        if cv2.waitKey(1) & 0xFF == 27:  # Presiona 'ESC' para salir
            break

    cap.release()
    cv2.destroyAllWindows()
    return data


if __name__ == "__main__":
   data= read_qr_code()
   print(data)
   sys.stdout.flush()
