# jlFriCAS

[![FriCAS CI on x64 Linux (with Julia support - SBCL based)](https://github.com/gvanuxem/jlfricas/actions/workflows/linuxJulia_sbcl.yml/badge.svg)](https://github.com/gvanuxem/jlfricas/actions/workflows/linuxJulia_sbcl.yml)\
[![FriCAS CI on x64 Linux (with Julia support - Clozure CL based)](https://github.com/gvanuxem/jlfricas/actions/workflows/linuxJulia_ccl.yml/badge.svg)](https://github.com/gvanuxem/jlfricas/actions/workflows/linuxJulia_ccl.yml)\
[![FriCAS CI on x64 macOS with Julia support](https://github.com/gvanuxem/jlfricas/actions/workflows/macOSJulia_x64_sbcl.yml/badge.svg)](https://github.com/gvanuxem/jlfricas/actions/workflows/macOSJulia_x64_sbcl.yml)\
[![FriCAS CI on Windows (with Julia support - SBCL based)](https://github.com/gvanuxem/jlfricas/actions/workflows/windowsJulia_sbcl.yml/badge.svg)](https://github.com/gvanuxem/jlfricas/actions/workflows/windowsJulia_sbcl.yml)

[FriCAS](https://fricas.github.io) is a general purpose computer algebra
system (CAS).

In this work-in-progress repository, a C wrapper using libjulia is embedded in [FriCAS](https://fricas.github.io/) to support some [Julia](https://julialang.org) specialized operations (for example, system optimized BLAS and LAPACK libraries). The build process supports Clozure CL and SBCL, but only Julia 1.10.0 and Julia 1.11.* are supported with SBCL, see [Caveats](#caveats). It must not be considered production-ready.

## Building and Installing

For general installation instructions see INSTALL. For general documentation
consult <https://fricas.github.io>.

To build FriCAS with Julia support, the <code>julia</code> executable needs to be available in your PATH, and a simple <code>./configure --enable-julia</code> should do the trick. We require Julia 1.6 or higher. Please see https://julialang.org/downloads/ for instructions on how to obtain Julia for your system. The required Julia packages are Suppressor, Nemo and SpecialFunctions.

As of now with Clozure CL [queues](https://github.com/oconnore/queues) is also required. Use installed [quicklisp](https://www.quicklisp.org/beta/) with `queues`, and at configure time use the `--with-quicklisp` option, see the `quicklisp` documentation for how to load it and install `queues`. Another possibility, easier, is to use [roswell](https://roswell.github.io/) with added `ccl-bin` and `queues`. GitHub actions for Clozure CL use it for building jlFriCAS.

If you want to visualize your data using Julia, small support is provided using `Plots` and eventually `LaTeXStrings` Julia packages.

If you want to use [jFriCAS](https://jfricas.readthedocs.io/en/latest/) i.e. Jupyter support for FriCAS built with SBCL, make sure [hunchentoot](https://edicl.github.io/hunchentoot/) is installed. On a Debian like system you can add `hunchentoot` with <code>sudo apt install cl-hunchentoot</code> and issue, for example, <code>./configure --enable-gmp --enable-julia --enable-hunchentoot</code>.

To know which categories/domains/packages are added to FriCAS issue in the
FriCAS interpreter <code>)what things julia</code> and/or <code>)what things nemo</code>  or use HyperDoc:

```
(1) -> )what things julia

Operations whose names satisfy the above pattern(s):

juliaCMPrint    juliaCVPrint    juliaIVPrint    juliaMPrint     
juliaVPrint     
   
      To get more information about an operation such as juliaCMPrint ,
      issue the command )display op juliaCMPrint 
------------------------------- Categories --------------------------------

Categories with names matching patterns:
     julia

 JARBPR   JuliaArbitraryPrecision      JMATCAT  JuliaMatrixCategory
 JOBAGG   JuliaObjectAggregate         JOBRING  JuliaObjectRing
 JOBTYPE  JuliaObjectType              JRING    JuliaRing
 JTYPE    JuliaType                    JVECCAT  JuliaVectorCategory
 JWSAGG   JuliaWSAggregate             JWSNUM   JuliaWSNumber
 JWSO     JuliaWSObject                JWSRING  JuliaWSRing
--------------------------------- Domains ---------------------------------

Domains with names matching patterns:
     julia

 JCF64    JuliaComplexF64              JCF64MAT JuliaComplexF64Matrix
 JCF64SMA JuliaComplexF64SquareMatrix  JCF64VEC JuliaComplexF64Vector
 JCFLOAT  JuliaComplexFloat            JDFRAME  JuliaDataFrame
 JF64     JuliaFloat64                 JF64MAT  JuliaFloat64Matrix
 JF64SMAT JuliaF64SquareMatrix         JF64VEC  JuliaFloat64Vector
 JFLOAT   JuliaFloat                   JI64     JuliaInt64
 JI64VEC  JuliaInt64Vector             JMATRIX  JuliaMatrix
 JOBAGG-  JuliaObjectAggregate&        JOBBINT  JuliaObjBigInt
 JOBBOOL  JuliaObjBoolean              JOBCF64  JuliaObjComplexF64
 JOBF64   JuliaObjFloat64              JOBI64   JuliaObjInt64
 JOBJECT  JuliaObject                  JOBRING- JuliaObjectRing&
 JOBTPLE  JuliaObjTuple                JOBTYPE- JuliaObjectType&
 JSTR     JuliaString                  JSYM     JuliaSymbol
 JVECTOR  JuliaVector                  JWSAGG-  JuliaWSAggregate&
 JWSAPCPX JuliaWSAPComplex             JWSAPR   JuliaWSAPReal
 JWSCPLX  JuliaWSComplex               JWSEXPR  JuliaWSExpression
 JWSGINT  JuliaWSGaussianInteger       JWSINT   JuliaWSInteger
 JWSLIST  JuliaWSList                  JWSMAT   JuliaWSMatrix
 JWSO-    JuliaWSObject&               JWSRAT   JuliaWSRational
 JWSREAL  JuliaWSReal                  JWSSYM   JuliaWSSymbol
 JWSVEC   JuliaWSVector
-------------------------------- Packages ---------------------------------

Packages with names matching patterns:
     julia

 JCF64MTF JuliaComplexF64MatrixTranscendentalFunctions
 JCFSF    JuliaComplexFloatSpecialFunctions
 JCLA     JuliaComplexLinearAlgebra    JDRAW    JuliaDrawFunctions
 JF64MTF  JuliaF64MatrixTranscendentalFunctions
 JF64SF   JuliaFloat64SpecialFunctions
 JF64SF2  JuliaFloat64SpecialFunctions2
 JF64VEC2 JuliaFloat64VectorFunctions2  JFSF     JuliaFloatSpecialFunctions
 JFSF2    JuliaFloatSpecialFunctions2  JPLOT    JuliaPlotFunctions
 JRLA     JuliaRealLinearAlgebra       JUF      JuliaUtilityFunctions
 JVECTOR2 JuliaVectorFunctions2
 JWSNSF   JuliaWSNumericalSpecialFunctions
 JWSUF    JuliaWSUtilityFunctions
--------------- System Commands for User Level: development ---------------

System commands at this level matching patterns:
     julia

julia     juliad jlapropos jldoc

------------------------- System Command Synonyms -------------------------

 )ju ............................ )julia
 )jud ........................... )juliad

```
Nemo Categories/Domains (JuliaObjects):

```
(1) -> )what things nemo

   There are no operations containing those patterns

------------------------------- Categories --------------------------------

Categories with names matching patterns:
     nemo

 NRING    NemoRing                     NTYPE    NemoType
--------------------------------- Domains ---------------------------------

Domains with names matching patterns:
     nemo

 NACB     NemoAcbField                 NAN      NemoAlgebraicNumber
 NARB     NemoArbField                 NCB      NemoComplexBall
 NCF      NemoComplexField             NECF     NemoExactComplexField
 NFF      NemoFiniteField              NFR      NemoFactored
 NINT     NemoInteger                  NMP      NemoMultivariatePolynomial
 NPF      NemoPrimeField               NRAT     NemoRational
 NRB      NemoRealBall                 NRF      NemoRealField
 NUP      NemoUnivariatePolynomial     NZMOD    NemoIntegerMod
```

If you want to build and install the HTML documentation,
you need to install Sphinx. On a Debian like system, to add it, issue in a
terminal <code>sudo apt install python3 python3-sphinx</code>.
After building FriCAS, and before the installation, issue in your terminal
<code>make htmldoc</code>.

## Description

The basic goal of [FriCAS](https://fricas.github.io) is to create a free
advanced world-class CAS. In 2007 [FriCAS](https://fricas.github.io)
forked from [Axiom](http://axiom-developer.org). Currently the
[FriCAS](https://fricas.github.io) algebra library is one of the largest
and most advanced free general purpose computer algebra systems \-- this
gives a good foundation to build on. Additionally, the
[FriCAS](https://fricas.github.io) algebra library is written in a high
level strongly typed language (Spad), which allows natural expression of
mathematical algorithms. This makes [FriCAS](https://fricas.github.io)
easier to understand and extend.

[FriCAS](https://fricas.github.io) uses lightweight development
methodology. Compared to [Axiom](http://axiom-developer.org),
[FriCAS](https://fricas.github.io) is significantly restructured \-- it
is more portable and fixed several defects.
[FriCAS](https://fricas.github.io) removed rather large unused parts
(without removing functionality).

## Goals

Current development goals:

-   continue structural improvements
-   add new mathematical algorithms
-   develop better user interface
-   develop improved Spad compiler
-   make it easier for external programs to interface with FriCAS
-   support for using external mathematical routines from Spad

## Caveats

Julia support with FriCAS built with SBCL is/was erratic, depending on the Julia version used and the loaded libraries by Julia. The 1.10.0 version seems to have solved some issues related to memory management interactions with SBCL, but with Julia 1.10.1 and 1.10.2 some problems occur again. Note that with Julia 1.11.0-* and later, FriCAS seems to work fine again. More work needs to be done in this regard. So, if you use SBCL to build FriCAS, imperatively use a version of Julia that is known to be compatible.
