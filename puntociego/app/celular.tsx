import { Fonts } from '@/constants/fonts';
import { GameContext } from '@/context/GameContext';
import { getClueById } from '@/data/clues';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OpcionChat {
  id: string;
  text: string;
}

interface MensajeChat {
  id: string;
  sender: string;
  text: string;
  type: 'text' | 'system' | 'narrative';
  status?: 'normal' | 'deleted' | 'failed';
}

// 📝 DIÁLOGOS CAPÍTULO 4
const GUION_CAP4_FINAL = [
  {
    opciones: [{ id: 'cap4_opt1', text: '¿Ahora qué pasó?' }],
    respuestas: [{ text: 'Hay gente moviendo cosas en el campus.', status: 'normal' }]
  },
  {
    opciones: [{ id: 'cap4_opt2', text: '¿Alcohol?' }],
    respuestas: [
      { text: 'No solo alcohol.', status: 'normal' },
      { text: 'Brownies, marihuana, cosas más fuertes.', status: 'normal' }
    ]
  },
  {
    opciones: [{ id: 'cap4_opt3', text: 'Janna, suena a rumor.' }],
    respuestas: [{ text: 'Ojalá fuera solo eso.', status: 'normal' }]
  },
  {
    opciones: [{ id: 'cap4_opt4', text: '¿Y Ben qué tiene que ver?' }],
    respuestas: [
      { text: 'No sé todavía.', status: 'normal' },
      { text: 'Pero lo vi cerca de ellos.', status: 'normal' }
    ]
  },
  {
    opciones: [{ id: 'cap4_opt5', text: '¿Dónde?' }],
    respuestas: [
      { text: 'En más de un lugar.', status: 'normal' },
      { text: 'Y no estaba solo.', status: 'normal' }
    ]
  },
  {
    opciones: [{ id: 'cap4_opt6', text: 'Janna, por favor, no empieces.' }],
    respuestas: [
      { text: 'No estoy inventando.', status: 'normal' },
      { text: 'Si algo me pasa, revisa lo que dejé.', status: 'normal' },
      { text: 'Mensaje eliminado', status: 'deleted' }
    ]
  },
  {
    opciones: [{ id: 'cap4_opt7', text: '¿Qué dejaste?' }],
    respuestas: []
  },
  {
    opciones: [{ id: 'cap4_opt8', text: '¿Janna?' }],
    respuestas: [{ text: 'Mensaje no enviado', status: 'failed' }]
  }
];

// 📝 DIÁLOGOS CAPÍTULO 5
const GUION_CAP5_FINAL = [
  {
    opciones: [{ id: 'cap5_opt1', text: '¿Para qué?' }],
    respuestas: [{ text: 'Jhon me está ayudando con unos archivos.', status: 'normal' }]
  },
  {
    opciones: [{ id: 'cap5_opt2', text: '¿Archivos de qué?' }],
    respuestas: [
      { text: 'Videos.', status: 'normal' },
      { text: 'Fotos.', status: 'normal' },
      { text: 'Pruebas.', status: 'normal' }
    ]
  },
  {
    opciones: [{ id: 'cap5_opt3', text: 'Janna, estás metiéndote en problemas.' }],
    respuestas: [{ text: 'Ya estoy metida.', status: 'normal' }]
  },
  {
    opciones: [{ id: 'cap5_opt4', text: '¿Esto tiene que ver con Ben?' }],
    respuestas: [
      { text: 'Sí.', status: 'normal' },
      { text: 'Pero no como tú crees.', status: 'normal' }
    ]
  },
  {
    opciones: [{ id: 'cap5_opt5', text: 'Entonces explícame.' }],
    respuestas: [
      { text: 'Todavía no.', status: 'normal' },
      { text: 'Primero necesito confirmar algo.', status: 'normal' }
    ]
  },
  {
    opciones: [{ id: 'cap5_opt6', text: '¿Confirmar qué?' }],
    respuestas: [
      { text: 'Mensaje eliminado', status: 'deleted' },
      { text: 'Si me pasa algo, no vayas sola al parque.', status: 'normal' }
    ]
  },
  {
    opciones: [{ id: 'cap5_opt7', text: '¿Qué parque?' }],
    respuestas: [{ text: 'Mensaje no enviado', status: 'failed' }]
  }
];

export default function CelularScreen() {
  const router = useRouter();
  const { capitulosCompletados, agregarPista, marcarLugarVisitado } = useContext(GameContext);
  const scrollViewRef = useRef<ScrollView>(null);

  // 🔍 Verificación de capítulos completados
  const yaTerminoCap4 = capitulosCompletados.includes('cap4');
  const yaTerminoCap5 = capitulosCompletados.includes('cap5');
  const yaTerminoCap6 = capitulosCompletados.includes('cap6');

  const [mensajes, setMensajes] = useState<MensajeChat[]>([]);
  const [pasoActual, setPasoActual] = useState(0);
  const [opciones, setOpciones] = useState<OpcionChat[]>([]);

  useEffect(() => {
    if (yaTerminoCap6) {
      // 📝 NUEVA CONVERSACIÓN DE MONÓLOGO (CAPÍTULO 6)
      setMensajes([
        { id: 'm1', sender: 'Yo', text: '"No quiero ir."', type: 'text', status: 'normal' },
        { id: 'm2', sender: 'Yo', text: '"No quiero recordar."', type: 'text', status: 'normal' },
        { id: 'm3', sender: 'Yo', text: '"Janna dijo que tenía pruebas."', type: 'text', status: 'normal' },
        { id: 'm4', sender: 'Yo', text: '"Janna dijo que Ben no era el problema."', type: 'text', status: 'normal' },
        { id: 'm5', sender: 'Yo', text: '"Pero si no era Ben..."', type: 'text', status: 'normal' },
      ]);
      setOpciones([]); // Sin opciones interactivas
    } else if (yaTerminoCap5) {
      setMensajes([
        { id: '1', sender: 'Janna', text: 'Fui a la FCM.', type: 'text', status: 'normal' }
      ]);
      setOpciones(GUION_CAP5_FINAL[0].opciones);
    } else if (yaTerminoCap4) {
      setMensajes([
        { id: '1', sender: 'Janna', text: 'Azula, necesito contarte algo.', type: 'text', status: 'normal' }
      ]);
      setOpciones(GUION_CAP4_FINAL[0].opciones);
    } else {
      setMensajes([
        { id: '1', sender: 'Janna', text: 'Donde todos hacen cola, nadie mira.', type: 'text', status: 'normal' }
      ]);
      setOpciones([]);
    }
    setPasoActual(0);
  }, [yaTerminoCap4, yaTerminoCap5, yaTerminoCap6]);

  const playClick = async () => {
    try {
      const sound = (global as any).clickSound?.current;
      if (sound) {
        await sound.stopAsync();
        await sound.playAsync();
      }
    } catch (e) {
      console.log('error click:', e);
    }
  };

  const cerrarCelular = async () => {
    await playClick();
    if (!yaTerminoCap4 && !yaTerminoCap5 && !yaTerminoCap6) {
      const pista = getClueById('cel_pista_comedor');
      if (pista) agregarPista(pista);
      marcarLugarVisitado('comedor-sanmarquino');
    }
    router.replace('/(tabs)/mapa');
  };

  const manejarEleccion = async (opcionElegida: OpcionChat) => {
    await playClick();
    
    const guionActivo = yaTerminoCap5 ? GUION_CAP5_FINAL : GUION_CAP4_FINAL;
    const pasoData = guionActivo[pasoActual];

    const esMensajeFallido = opcionElegida.text === '¿Janna?' || opcionElegida.text === '¿Qué parque?';

    const nuevoMensajeUsuario: MensajeChat = { 
      id: Date.now().toString(), 
      sender: 'Yo', 
      text: opcionElegida.text, 
      type: 'text',
      status: esMensajeFallido ? 'failed' : 'normal'
    };
    
    setMensajes((prev) => [...prev, nuevoMensajeUsuario]);
    setOpciones([]); 

    if (pasoData.respuestas.length > 0) {
      let delayAcumulado = 0;
      pasoData.respuestas.forEach((respuesta, index) => {
        delayAcumulado += 1200; 
        setTimeout(() => {
          const esSystemDeleted = respuesta.status === 'deleted';
          const msgJanna: MensajeChat = {
            id: (Date.now() + index).toString(), 
            sender: 'Janna', 
            text: respuesta.text, 
            type: esSystemDeleted ? 'system' : 'text',
            status: respuesta.status as any
          };
          setMensajes((prev) => [...prev, msgJanna]);
          
          if (index === pasoData.respuestas.length - 1) {
            avanzarPaso();
          }
        }, delayAcumulado);
      });
    } else {
      setTimeout(() => {
        avanzarPaso();
      }, 1000);
    }
  };

  const avanzarPaso = () => {
    setPasoActual((prev) => {
      const guionActivo = yaTerminoCap5 ? GUION_CAP5_FINAL : GUION_CAP4_FINAL;
      const siguiente = prev + 1;
      if (siguiente < guionActivo.length) {
        setOpciones(guionActivo[siguiente].opciones);
      } else {
        setOpciones([]); 
      }
      return siguiente;
    });
  };

  const usarMensajesInteractivos = (yaTerminoCap4 || yaTerminoCap5) && !yaTerminoCap6;

  // Personalización del encabezado del celular si estamos en el Cap 6
  const headerTitle = yaTerminoCap6 ? "Notas personales" : "Janna";
  const headerStatus = yaTerminoCap6 ? "última vez hoy" : "en línea";
  const avatarSource = yaTerminoCap6 
    ? require('@/assets/images/azula.png') // Foto de Azula
    : require('@/assets/images/janna.png'); // Foto de Janna

  return (
    <View style={styles.container}>
      <View style={styles.phone}>
        <View style={styles.notch} />

        <View style={[styles.header, yaTerminoCap6 ? styles.headerNotes : null]}>
          <Image 
            source={avatarSource} 
            style={styles.avatarImage} 
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.contact}>{headerTitle}</Text>
            <Text style={styles.status}>{headerStatus}</Text>
          </View>
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatArea} 
          contentContainerStyle={{ paddingBottom: 20 }}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {mensajes.map((msg) => {
            const esMio = msg.sender === 'Yo';
            const esEliminado = msg.status === 'deleted';
            const esFallido = msg.status === 'failed';
            const esNarrativa = msg.type === 'narrative';

            if (esNarrativa) {
              return (
                <View key={msg.id} style={styles.narrativeContainer}>
                  <Text style={styles.narrativeText}>{msg.text}</Text>
                </View>
              );
            }

            if (esEliminado) {
              return (
                <View key={msg.id} style={[styles.message, styles.theirMessage, styles.deletedBox]}>
                  <Text style={styles.deletedText}>🚫 {msg.text}</Text>
                </View>
              );
            }

            return (
              <View key={msg.id} style={styles.msgContainer}>
                <View style={[
                  styles.message, 
                  esMio ? styles.myMessage : styles.theirMessage,
                  yaTerminoCap6 ? styles.noteMessage : null
                ]}>
                  {!esMio && <Text style={styles.sender}>{msg.sender}</Text>}
                  <Text style={[styles.text, yaTerminoCap6 ? styles.textNote : null]}>{msg.text}</Text>
                </View>
                {esFallido && (
                  <View style={styles.failedStatusContainer}>
                    <Text style={styles.failedStatusText}>⚠️ Mensaje no enviado.</Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.interactionArea}>
          {usarMensajesInteractivos && opciones.length > 0 ? (
            opciones.map((opcion) => (
              <TouchableOpacity 
                key={opcion.id} 
                style={styles.optionButton} 
                activeOpacity={0.7} 
                onPress={() => manejarEleccion(opcion)}
              >
                <Text style={styles.optionText}>{opcion.text}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.fakeInput}>
              <Text style={styles.fakeInputText}>
                {yaTerminoCap6 ? "No puedes editar esta nota." : "Escribe un mensaje..."}
              </Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={cerrarCelular}>
        <Text style={styles.buttonText}>
          {yaTerminoCap4 || yaTerminoCap5 || yaTerminoCap6 ? "Cerrar Chat" : "Guardar pista"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090910', alignItems: 'center', justifyContent: 'center', padding: 24 },
  phone: { width: '95%', maxWidth: 380, aspectRatio: 0.48, backgroundColor: '#ece5dd', borderRadius: 40, borderWidth: 6, borderColor: '#f3c8d8', paddingBottom: 20, overflow: 'hidden', position: 'relative' },
  notch: { width: 120, height: 25, backgroundColor: '#090910', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, alignSelf: 'center', position: 'absolute', top: 0, zIndex: 10 },
  
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#075e54', paddingTop: 45, paddingBottom: 12, paddingHorizontal: 16, marginBottom: 16 },
  headerNotes: { backgroundColor: '#84596b' }, // Encabezado de notas en tonos guindas
  
  avatarImage: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#ccc', marginRight: 14 },
  headerTextContainer: { justifyContent: 'center' },
  contact: { fontFamily: Fonts.sunshine, color: 'white', fontSize: 26, lineHeight: 28 },
  status: { fontFamily: Fonts.sunshine, color: 'rgba(255,255,255,0.8)', fontSize: 16 },
  chatArea: { flex: 1, paddingHorizontal: 16 },
  
  msgContainer: { marginBottom: 16, width: '100%' },
  message: { maxWidth: '85%', padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 1 },
  theirMessage: { alignSelf: 'flex-start', backgroundColor: '#ffffff', borderRadius: 12, borderTopLeftRadius: 0 },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#dcf8c6', borderRadius: 12, borderTopRightRadius: 0 },
  
  // Estilos de la nota del Cap 6
  noteMessage: { alignSelf: 'center', backgroundColor: '#fff9db', borderRadius: 8, maxWidth: '95%', borderWidth: 1, borderColor: '#e5db9c', shadowOpacity: 0.05 },
  textNote: { fontFamily: Fonts.sunshine, color: '#4a431c', fontSize: 25, textAlign: 'center', fontStyle: 'italic' },
  
  sender: { fontFamily: Fonts.sunshine, color: '#075e54', fontSize: 16, marginBottom: 4 },
  text: { fontFamily: Fonts.sunshine, color: '#303030', fontSize: 24, lineHeight: 30 },
  
  deletedBox: { backgroundColor: '#f0f0f0', borderStyle: 'dashed', borderWidth: 1, borderColor: '#999', marginBottom: 16 },
  deletedText: { fontFamily: Fonts.sunshine, color: '#777', fontSize: 22, fontStyle: 'italic' },
  
  failedStatusContainer: { alignSelf: 'flex-end', marginTop: 2, marginRight: 4 },
  failedStatusText: { fontFamily: Fonts.sunshine, color: '#d32f2f', fontSize: 16 },

  // Estilo narrativo de Azula leyendo la nota
  narrativeContainer: { marginVertical: 12, paddingHorizontal: 8, width: '100%' },
  narrativeText: { fontFamily: Fonts.sunshine, color: '#655e63', fontSize: 22, textAlign: 'center', lineHeight: 26 },

  interactionArea: { paddingHorizontal: 16, paddingTop: 8 },
  optionButton: { backgroundColor: '#34b7f1', padding: 14, borderRadius: 20, marginBottom: 8, alignItems: 'center' },
  optionText: { fontFamily: Fonts.sunshine, color: 'white', fontSize: 18, textAlign: 'center' },
  fakeInput: { height: 48, backgroundColor: '#ffffff', borderRadius: 24, justifyContent: 'center', paddingHorizontal: 20 },
  fakeInputText: { fontFamily: Fonts.sunshine, color: '#999', fontSize: 18 },
  button: { backgroundColor: '#c084b6', borderRadius: 20, paddingHorizontal: 32, paddingVertical: 16, marginTop: 24 },
  buttonText: { fontFamily: Fonts.sunshine, color: 'white', fontSize: 24, textAlign: 'center' },
});
