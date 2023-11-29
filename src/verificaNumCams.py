import cv2
import numpy as np

def contar_camaras():
    # Crear un arreglo NumPy vacío
    num_camaras = list()
    camara = 0

    while True:
        # Intenta abrir la siguiente cámara en la secuencia
        cap = cv2.VideoCapture(camara)

        # Verifica si la cámara se abrió correctamente
        if not cap.isOpened():
            break

        # Libera la cámara
        cap.release()

        #Guarda la camara que si esta disponible
        num_camaras.append(camara)

        # Incrementa el contador de cámaras
        camara += 1

    return num_camaras

# Obtén el número de cámaras disponibles
cantidad_camaras = contar_camaras()

print(cantidad_camaras)
